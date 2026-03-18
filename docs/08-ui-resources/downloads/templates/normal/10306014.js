function screen_on_load()
{
	
}
//슬라이드 다음화면으로 이동
function btn_Certificate_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.movenext();	
}
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}