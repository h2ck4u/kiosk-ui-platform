function screen_on_load()
{

}

function btn_SSN_on_mouseup(objInst)
{
//	let parentScr = this.screen.getparent();
//	let sld = parentScr.getinstancebyname("SV_Template");
//	//버튼의 네임가져오고 substr이 뭐지..문자열을 짜른다?
//	let objNm = objInst.getname().substr(3);
//	SYSUtil.fn_Debug(this, "objNm:"+objNm);
//	SYSUtil.fn_Debug(this, "objNm.substr(3):"+objNm.substr(3));
//	//버튼 텍스트 가져오고
//	let itemNm = objInst.gettext();
//	//텍스트 가져오고
//	let itemPr = this.screen.getinstancebyname("TX_"+objNm).gettext();
//	SYSUtil.fn_Debug(this, "itemNm:"+itemNm);
//	SYSUtil.fn_Debug(this, "itemPr:"+itemPr);
//	//가져온정보들을 Info에 저장한다음
//	let itemInfo1 = sld.getcustomprop("itemInfo1");
//	let itemInfo2 = sld.getcustomprop("itemInfo2");
//	//차량
//	itemInfo1.itemNm = itemNm;
//	//200원
//	itemInfo2.itemPr = itemPr;
////	let itemInfo = {itemNm:itemNm, itemPr:itemPr};
//	SYSUtil.fn_Debug(this, "itemInfo1:" + itemNm);
//	SYSUtil.fn_Debug(this, "itemInfo2:" + itemPr);
//	sld.setcustomprop("itemInfo1", itemNm);
//	sld.setcustomprop("itemInfo2", itemPr);
	factory.loadpopupex("무인민원발급기_3(팝업)", "/BIZ/103/06LP/POP/10306018", "발급", true, XFD_BORDER_NONE, 90, 864, 0, 0, false, true, true, screen);
}

function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();
} 

function btn_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	//버튼의 네임가져오고 substr이 뭐지..문자열을 짜른다?
	let objNm = objInst.getname().substr(3);
	SYSUtil.fn_Debug(this, "objNm:"+objNm);
	SYSUtil.fn_Debug(this, "objNm.substr(3):"+objNm.substr(3));
	//버튼 텍스트 가져오고
	let itemNm = objInst.gettext();
	//텍스트 가져오고
	let itemPr = this.screen.getinstancebyname("TX_"+objNm).gettext();
	SYSUtil.fn_Debug(this, "itemNm:"+itemNm);
	SYSUtil.fn_Debug(this, "itemPr:"+itemPr);
	//가져온정보들을 Info에 저장한다음
	let itemInfo1 = sld.getcustomprop("itemInfo1");
	let itemInfo2 = sld.getcustomprop("itemInfo2");
	//차량
	itemInfo1.itemNm = itemNm;
	//200원
	itemInfo2.itemPr = itemPr;
//	let itemInfo = {itemNm:itemNm, itemPr:itemPr};
	SYSUtil.fn_Debug(this, "itemInfo1:" + itemNm);
	SYSUtil.fn_Debug(this, "itemInfo2:" + itemPr);
	sld.setcustomprop("itemInfo1", itemNm);
	sld.setcustomprop("itemInfo2", itemPr);
	
	sld.setfocus();
	sld.movenext();
}
//다음항목페이지 버튼
function btn_Next_on_mouseup(objInst)
{
	if(this.txt_page1.gettext() == 1) {
		this.txt_page1.settext("2");
	}else if(this.txt_page1.gettext() == 2) {
		this.txt_page1.settext("3");
	}
}

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

function btn_ac_on_mouseup(objInst)
{
	factory.loadportletpopup("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}

function btn_call_on_mouseup(objInst)
{
      screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

//이전항목페이지 버튼
function btn_PrevPage_on_mouseup(objInst)
{
	if(this.txt_page1.gettext() == 3) {
		this.txt_page1.settext("2");
	}else if(this.txt_page1.gettext() == 2) {
		this.txt_page1.settext("1");
	}
}

//팝업닫혔을때
function screen_on_popupdestroy(popup_screen, popup_name, result)
{
	factory.consoleprint("screen_on_popupdestroy> Start");
	factory.consoleprint("screen_on_popupdestroy> popup_screen = " + popup_screen.getscreenurl());
	factory.consoleprint("screen_on_popupdestroy> popup_name = " + popup_name);
	factory.consoleprint("screen_on_popupdestroy> result = " + result);
	
	if(result == "FA") {
		let parentScr = this.screen.getparent();
		let sld = parentScr.getinstancebyname("SV_Template");
		sld.setfocus();
		sld.movenext();
	} else {
		
	}
}

//앞페이지에서 처리함
//function btn_flag_on_mouseup(objInst)
//{
//	let parentScr = this.screen.getparent();
//	let sld = parentScr.getinstancebyname("SV_Template");
//	let itemInfo = sld.getcustomprop("itemInfo");
//	SYSUtil.fn_Debug(this, "itemInfo:"+ itemInfo);
//	
//	if(itemInfo == 1) {
//		this.btn_flag.setimagenormal("/BIZ/103/06LP/PUB/language_lound_kr_bt.png");
//		this.btn_flag.setimagedown("/BIZ/103/06LP/PUB/language_lound_kr_bt_o.png");
//		this.btn_flag.setimagefocus("/BIZ/103/06LP/PUB/language_lound_kr_bt_dim.png");
//	} else if(itemInfo == 2) {
//		this.btn_flag.setimagenormal("/BIZ/103/06LP/PUB/language_lound_eng_bt.png");
//		this.btn_flag.setimagedown("/BIZ/103/06LP/PUB/language_lound_eng_bt_o.png");
//		this.btn_flag.setimagefocus("/BIZ/103/06LP/PUB/language_lound_eng_bt_dim22.png");
//	} else if(itemInfo == 3) {
//		this.btn_flag.setimagenormal("/BIZ/103/06LP/PUB/language_lound_cha_bt.png");
//		this.btn_flag.setimagedown("/BIZ/103/06LP/PUB/language_lound_cha_bt_o.png");
//		this.btn_flag.setimagefocus("/BIZ/103/06LP/PUB/language_lound_cha_bt_dim22.png");
//	} else {
//		this.btn_flag.setimagenormal("/BIZ/103/06LP/PUB/language_lound_jpa_bt.png");
//		this.btn_flag.setimagedown("/BIZ/103/06LP/PUB/language_lound_jpa_bt_o.png");
//		this.btn_flag.setimagefocus("/BIZ/103/06LP/PUB/language_lound_jpa_bt_dim22.png");
//	}
//}