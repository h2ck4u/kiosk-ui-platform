function screen_on_load()
{

}
//국가에 맞는 이미지 변경 함수와 함께 슬라이드 다음화면으로 이동
function btn_Start_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	this.fn_nationFlag();
	sld.movenext();
}
//접근성 팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}
//국가별 이름값을 가져옴
function btn_Image_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let objNm = objInst.getname().substr(4);

	let itemNm = objInst.gettext();
	let itemInfo = sld.getcustomprop("itemInfo");

	itemInfo.itemNm = itemNm;
	sld.setcustomprop("itemInfo", itemNm);
}
//국가별 오브젝트를 찾음
function fn_nationFlag()
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");

	let nationVal = this.btn_Image1.gettext();
	let i,tab,nationFlagObj;

	for(i = 0; i < sld.getitemcount() ; i++){

		tab = sld.getchildinstancefirst(i);
		nationFlagObj = tab.getchildinstancebyname(0,"btn_Flag");

		if(nationFlagObj != null){
			this.fn_nationChange(nationFlagObj,nationVal);
		}
	}
}
//국가별 텍스트값에 따라 이미지변경
function fn_nationChange(nationFlagObj,nationFlag)
{
	if(nationFlag == 1) {
		nationFlagObj.setimagenormal("/BIZ/103/06/PUB/language_lound_kr_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06/PUB/language_lound_kr_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06/PUB/language_lound_kr_bt_dim.png");
	} else if(nationFlag == 2) {
		nationFlagObj.setimagenormal("/BIZ/103/06/PUB/language_lound_eng_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06/PUB/language_lound_eng_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06/PUB/language_lound_eng_bt_dim22.png");
	} else if(nationFlag == 3) {
		nationFlagObj.setimagenormal("/BIZ/103/06/PUB/language_lound_cha_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06/PUB/language_lound_cha_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06/PUB/language_lound_cha_bt_dim22.png");
	} else if(nationFlag == 4) {
		nationFlagObj.setimagenormal("/BIZ/103/06/PUB/language_lound_jpa_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06/PUB/language_lound_jpa_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06/PUB/language_lound_jpa_bt_dim22.png");
	}
}