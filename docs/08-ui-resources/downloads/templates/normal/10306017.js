function screen_on_load()
{
	
}
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}
//슬라이드 이전화면으로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();	
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}