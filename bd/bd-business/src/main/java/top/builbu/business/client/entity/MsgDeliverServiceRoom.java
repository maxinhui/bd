package top.builbu.business.client.entity;

import java.util.List;

import top.builbu.business.user.entity.MsgUserInfo;

/**
 * 
 */
public class MsgDeliverServiceRoom extends MsgDeliverService {
    /** 在线人数 **/
    private int onlieNum;
    /** 聊天人员列表信息 */
    private List<MsgUserInfo> onlieList;

    public int getOnlieNum() {
        return onlieNum;
    }

    public void setOnlieNum(int onlieNum) {
        this.onlieNum = onlieNum;
    }

    public List<MsgUserInfo> getOnlieList() {
        return onlieList;
    }

    public void setOnlieList(List<MsgUserInfo> onlieList) {
        this.onlieList = onlieList;
    }
}