package com.weiCommity.Service;

import com.weiCommity.Dao.UserWorkDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * PackageName com.weiCommity.Service
 * Created by uryuo on 17/5/10.
 */
@Service
public class UserWorkService {
    final UserWorkDao workDao;

    @Autowired
    public UserWorkService(UserWorkDao workDao) {
        this.workDao = workDao;
    }


}
