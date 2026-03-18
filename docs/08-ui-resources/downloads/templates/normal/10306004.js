function screen_on_load()
{
	
}
//필드에 입력 되어있는 값을 초기화 후 슬라이드 이전화면으로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();
	
	this.fld_Num.settext("");
}
//주민등록번호 로직 체크
function btn_Next_on_mouseup(objInst)
{
   let parentScr = this.screen.getparent();
   let sld = parentScr.getinstancebyname("SV_Template");

   let jumin = this.screen.getinstancebyname("fld_Num").gettext();

   jumin = jumin.split('');
   let ckarr = [2,3,4,5,6,7,8,9,2,3,4,5];

   let i="";
   for(i=0; i<jumin.length-1; i++){
      jumin[i] = jumin[i] * ckarr[i];
   }
   let juminlast = jumin[jumin.length-1];
   
   let sum = 0;
   for(i=0; i<jumin.length-1; i++){
      sum += jumin[i];
   }
   
   sum = sum % 11;
   
   sum = 11 - sum;
   
   if(sum > 9){
      sum = sum % 10;
   }
   
   if(sum == juminlast){
      sld.setfocus();
      sld.movenext();
	this.fld_Num.settext("");
   }
   if(sum != juminlast){
	screen.messagebox("유효하지 않은 주민등록번호 입니다.", "주민등록번호", 1, 2);
	this.fld_Num.settext("");
//      screen.alert("유효하지 않은 주민등록번호 입니다.");   
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
//주민등록번호 길이 체크
function btn_Num_on_mouseup(objInst)
{
   let numTxt;
   var n = this.fld_Num.gettext().length;
   
   numTxt = objInst.gettext();
   var strTmp = this.fld_Num.gettext();
   
   if (n==13) {
      this.fld_Num.settext(strTmp + "-" + numTxt);
   } else {
      this.fld_Num.settext(strTmp + numTxt);
   }
}
//전체 지우기
function btn_Clean_on_mouseup(objInst)
{
	this.fld_Num.settext("");
}
//한글자 지우기
function btn_Del_on_mouseup(objInst)
{
   var n = this.fld_Num.gettext().length;
   
   // 패턴 대신 두번째 "-" 처리   
   var strVal ="";
   if (n==15) {
      strVal = this.fld_Num.gettext().substr(0,n-2);
   } else {
      strVal = this.fld_Num.gettext().substr(0,n-1);
   }
   this.fld_Num.settext(strVal);
}
//취소버튼 클릭시 필드에 입력 된 값을 초기화 후 첫번째 슬라이드로 이동
function btn_Cancle_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveat(0);
	this.fld_Num.settext("");
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}