package com.weiCommity.Dao;

import com.weiCommity.Model.*;
import com.weiCommity.Util.StaticVar;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * PackageName com.weiCommity.Dao
 * Created by uryuo on 17/5/12.
 */
@Repository
public class PersonOrientDao extends BaseDao {

    public List<ProjectInfoPersonalOriented> getAllOPProject(ProjectInfoPersonalOriented thisLogin) {
        return (List<ProjectInfoPersonalOriented>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_getAllOPProject", thisLogin);
    }

    public List<UserExtend> getAllUWorkByUuid(Login thisUser) {
        return (List<UserExtend>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_AllUWorkByUuid", thisUser);
    }

    public PersonalInfoPersonalOriented getPersonalInfoOne(Login thisUser) {
        return (PersonalInfoPersonalOriented) BaseDao.selOneFromSQL(StaticVar.getMapperNameSpace() + "sel_getPersonalInfoOne", thisUser);
    }

    public List<CommityInfoPersonalOriented> getAllCommityInfoPO(Login thisUser) {
        return (List<CommityInfoPersonalOriented>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_CommityInfoPO", thisUser);
    }

    public List<MessageBox> getAllMailPPO(MessageBox thisUser) {
        return (List<MessageBox>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_getAllMailPO", thisUser);
    }

    public List<ProjectInfoPersonalOriented> getAllProjectPO(Login login) {
        return (List<ProjectInfoPersonalOriented>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_AllProjectInfoPO", login);
    }

    public List<UserTFWork> getAllUTFWork(String thisUUid) {
        return (List<UserTFWork>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_getAllPersonalTFWork", thisUUid);
    }

    public List<CommityMember> getAllCommityMemPO(CommityMember member) {
        return (List<CommityMember>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_getAllCommityMem", member);
    }

    public List<MessageBox> getAllCommityMsg(CommityMember elem) {
        return (List<MessageBox>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_getAllCommityMsg", elem);
    }

    public List<MessageBox> getAllPersonalMessage(MessageBox messageBox) {
        return (List<MessageBox>) BaseDao.selListFromSQL(StaticVar.getMapperNameSpace() + "sel_PersonalMessage", messageBox);
    }
}
