function screen_on_load()
{

}
//주민등록번호 버튼 값을 가져온 후 팝업창을 띄움
function btn_resNum_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let objNm = objInst.getname().substr(4);
	let itemNm = objInst.gettext();
	let itemPr = this.screen.getinstancebyname("txt_"+objNm).gettext();
	let resNm = sld.getcustomprop("resNm");
	let resPr = sld.getcustomprop("resPr");

	sld.setcustomprop("resNm", itemNm);
	sld.setcustomprop("resPr", itemPr);
	factory.loadpopupex("무인민원발급기_3(팝업)", "/BIZ/103/06/POP/10306018", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);
}
//슬라이드 이전화면으로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();
} 
//메뉴별 버튼값을 저장 후 다음 슬라이드로 이동
function btn_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let objNm = objInst.getname().substr(4);
	let itemNm = objInst.gettext();
	let itemPr = this.screen.getinstancebyname("txt_"+objNm).gettext();
	let resNm = sld.getcustomprop("resNm");
	let resPr = sld.getcustomprop("resPr");

	let repItemPr = itemPr.replace(/[^0-9]/g, '');
	
	sld.setcustomprop("resNm", itemNm);
	sld.setcustomprop("resPr", parseInt(repItemPr));

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
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}
//접근성 팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
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
//팝업 닫혔을때
function screen_on_popupdestroy(popup_screen, popup_name, result)
{
	if(result) {
		let parentScr = this.screen.getparent();
		let sld = parentScr.getinstancebyname("SV_Template");
		sld.setfocus();
		sld.movenext();
	}
}