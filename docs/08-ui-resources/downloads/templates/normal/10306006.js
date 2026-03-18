function screen_on_load()
{
	
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
//슬라이드 다음화면으로 이동
function btn_Issued_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.movenext();
}
//접근성 팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}
//전체포함 버튼 클릭시 하단 포함버튼 일괄변경
function entire_Btn(objInst, bPrevCheckState, bCurCheckState)
{
	if(this.btn_Entire.getcheck()){
		this.chbox1.setcheck(true);
		this.chbox3.setcheck(true);
		this.chbox5.setcheck(true);
		this.chbox7.setcheck(true);
		this.chbox9.setcheck(true);
		this.chbox11.setcheck(true);
		this.chbox13.setcheck(true);
		this.chbox15.setcheck(true);
		this.chbox17.setcheck(true);
		this.chbox19.setcheck(true);
		this.chbox2.setcheck(false);
		this.chbox4.setcheck(false);
		this.chbox6.setcheck(false);
		this.chbox8.setcheck(false);
		this.chbox10.setcheck(false);
		this.chbox12.setcheck(false);
		this.chbox14.setcheck(false);
		this.chbox16.setcheck(false);
		this.chbox18.setcheck(false);
		this.chbox20.setcheck(false);
	}else if(this.btn_EntireN.getcheck()){
		this.chbox2.setcheck(true);
		this.chbox4.setcheck(true);
		this.chbox6.setcheck(true);
		this.chbox8.setcheck(true);
		this.chbox10.setcheck(true);
		this.chbox12.setcheck(true);
		this.chbox14.setcheck(true);
		this.chbox16.setcheck(true);
		this.chbox18.setcheck(true);
		this.chbox20.setcheck(true);
		this.chbox1.setcheck(false);
		this.chbox3.setcheck(false);
		this.chbox5.setcheck(false);
		this.chbox7.setcheck(false);
		this.chbox9.setcheck(false);
		this.chbox11.setcheck(false);
		this.chbox13.setcheck(false);
		this.chbox15.setcheck(false);
		this.chbox17.setcheck(false);
		this.chbox19.setcheck(false);
	}
}

//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}