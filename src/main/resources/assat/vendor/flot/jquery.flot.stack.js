(function ($) {
    var options = {series: {stack: null}};

    function init(plot) {
        function findMatchingSeries(s, allseries) {
            var res = null;
            for (var i = 0; i < allseries.length; ++i) {
                if (s == allseries[i])
                    break;
                if (allseries[i].stack == s.stack)
                    res = allseries[i];
            }
            return res;
        }

        function stackData(plot, s, datapoints) {
            if (s.stack == null || s.stack === false)
                return;
            var other = findMatchingSeries(s, plot.getData());
            if (!other)
                return;
            var ps = datapoints.pointsize, points = datapoints.points, otherps = other.datapoints.pointsize,
                otherpoints = other.datapoints.points, newpoints = [], px, py, intery, qx, qy, bottom,
                withlines = s.lines.show, horizontal = s.bars.horizontal,
                withbottom = ps > 2 && (horizontal ? datapoints.format[2].x : datapoints.format[2].y),
                withsteps = withlines && s.lines.steps, fromgap = true, keyOffset = horizontal ? 1 : 0,
                accumulateOffset = horizontal ? 0 : 1, i = 0, j = 0, l, m;
            while (true) {
                if (i >= points.length)
                    break;
                l = newpoints.length;
                if (points[i] == null) {
                    for (m = 0; m < ps; ++m)
                        newpoints.push(points[i + m]);
                    i += ps;
                }
                else if (j >= otherpoints.length) {
                    if (!withlines) {
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                    }
                    i += ps;
                }
                else if (otherpoints[j] == null) {
                    for (m = 0; m < ps; ++m)
                        newpoints.push(null);
                    fromgap = true;
                    j += otherps;
                }
                else {
                    px = points[i + keyOffset];
                    py = points[i + accumulateOffset];
                    qx = otherpoints[j + keyOffset];
                    qy = otherpoints[j + accumulateOffset];
                    bottom = 0;
                    if (px == qx) {
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                        newpoints[l + accumulateOffset] += qy;
                        bottom = qy;
                        i += ps;
                        j += otherps;
                    }
                    else if (px > qx) {
                        if (withlines && i > 0 && points[i - ps] != null) {
                            intery = py + (points[i - ps + accumulateOffset] - py) * (qx - px) / (points[i - ps + keyOffset] - px);
                            newpoints.push(qx);
                            newpoints.push(intery + qy);
                            for (m = 2; m < ps; ++m)
                                newpoints.push(points[i + m]);
                            bottom = qy;
                        }
                        j += otherps;
                    }
                    else {
                        if (fromgap && withlines) {
                            i += ps;
                            continue;
                        }
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                        if (withlines && j > 0 && otherpoints[j - otherps] != null)
                            bottom = qy + (otherpoints[j - otherps + accumulateOffset] - qy) * (px - qx) / (otherpoints[j - otherps + keyOffset] - qx);
                        newpoints[l + accumulateOffset] += bottom;
                        i += ps;
                    }
                    fromgap = false;
                    if (l != newpoints.length && withbottom)
                        newpoints[l + 2] += bottom;
                }
                if (withsteps && l != newpoints.length && l > 0 && newpoints[l] != null && newpoints[l] != newpoints[l - ps] && newpoints[l + 1] != newpoints[l - ps + 1]) {
                    for (m = 0; m < ps; ++m)
                        newpoints[l + ps + m] = newpoints[l + m];
                    newpoints[l + 1] = newpoints[l - ps + 1];
                }
            }
            datapoints.points = newpoints;
        }

        plot.hooks.processDatapoints.push(stackData);
    }

    $.plot.plugins.push({init: init, options: options, name: 'stack', version: '1.2'});
})(jQuery);