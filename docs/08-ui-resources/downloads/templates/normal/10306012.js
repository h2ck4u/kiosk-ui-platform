function screen_on_load()
{
	
}
//슬라이드 다음화면으로 이동
function btn_Pay_on_mouseup(objInst) {
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.movenext();	
}
//슬라이드 이전화면으로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();	
}
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}
//팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}

//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}