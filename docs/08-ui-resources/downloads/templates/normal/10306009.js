function screen_on_load()
{
	
}
//이전버튼 클릭시 주민등록 메뉴일 경우 바로 이전슬라이드로 이동, 다른 메뉴일 경우 4번째 슬라이드로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let resNm = sld.getcustomprop("resNm");
	
	if(resNm == "주민등록") {
		sld.setfocus();
		sld.moveprev();
		this.fld_NumCirk.settext("");
	} else {
		sld.setfocus();
		sld.moveat(3);
		this.fld_NumCirk.settext("");
	}
}
//완료버튼 클릭시 필드값을 담아서 다음 슬라이드 화면에 값을 세팅
function btn_Ok_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let objNm = objInst.getname().substr(3);
	let itemNm = objInst.gettext();
	let itemPr = this.screen.getinstancebyname("fld_NumCir"+objNm).gettext();

   if(itemPr == 0){
      screen.messagebox("부수를 입력하세요", "부수입력", 1, 2);
      sld.setfocus();
      sld.moveat(5);
      this.fld_NumCirk.settext("");
   }else{
      sld.setfocus();
      sld.movenext();
      this.fn_Pay();
      this.fld_NumCirk.settext("");
   }
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
//키패드 동작 이벤트
function btn_Num_on_mouseup(objInst)
{
   let numTxt;
   var n = this.fld_NumCirk.gettext().length;
   
   numTxt = objInst.gettext();
   var strTmp = this.fld_NumCirk.gettext();
   
   if (n==2) {
      this.fld_NumCirk.settext(strTmp + "-" + numTxt);
   } else {
      this.fld_NumCirk.settext(strTmp + numTxt);
   }
}
//전체 지우기
function btn_Clean_on_mouseup(objInst)
{
   this.fld_NumCirk.settext("");
}

//한글자 지우기
function btn_Del_on_mouseup(objInst)
{
   var n = this.fld_NumCirk.gettext().length;
   
   // 패턴 대신 두번째 "-" 처리   
   var strVal ="";
   if (n==4) {
      strVal = this.fld_NumCirk.gettext().substr(0,n-2);
   } else {
      strVal = this.fld_NumCirk.gettext().substr(0,n-1);
   }
   this.fld_NumCirk.settext(strVal);
}
//취소버튼 클릭시 필드에 입력된 값을 초기화 후 첫번째 슬라이드로 이동
function btn_Cancle_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveat(0);
	this.fld_NumCirk.settext("");
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);	
}

//요금,부수,합계 계산
function fn_Pay()
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");

	let itemName = sld.getcustomprop("resNm");
	let expression = itemName.replace(/\s/g, "");
	//아이템가격
	let itemInfo2 = sld.getcustomprop("resPr");
	if(isNaN(itemInfo2)) itemInfo2 = 0;
	let busu = this.fld_NumCirk.gettext();
	let totalPayment = 0;
		if(busu == 0 || busu == "") { 
			screen.messagebox("부수를 입력하세요", "부수입력", 1, 2);
//			sld.moveat(5);
			return ;
		}
		totalPayment = busu * itemInfo2;
	
		sld.setcustomprop("totalPayment", totalPayment);
		let itemIdx = sld.getitemfocus();
		let tabObj = sld.getchildinstancefirst(itemIdx);
		let tabObjUrl = tabObj.getinnerscreenurl(0);
		
		let bizScr = tabObj.getchildscreeninstance(0);
		let sumObj = bizScr.getinstancebyname("fd_Sum");
		let priceObj = bizScr.getinstancebyname("fd_Photo");
		let chargeObj = bizScr.getinstancebyname("fd_Charge");
		let paymentObj = bizScr.getinstancebyname("fld_Item0");
		let sumTxtObj = bizScr.getinstancebyname("txt_Sum");
		let chargeTxtObj = bizScr.getinstancebyname("txt_Charge");
		let paymentTxtObj = bizScr.getinstancebyname("txt_Payment");
		let certiTxtObj = bizScr.getinstancebyname("txt_Certificate");

		if(totalPayment == 0){		
			sumObj.setvisible(false);
			chargeObj.setvisible(false)
			paymentObj.setvisible(false);
			sumTxtObj.setvisible(true);
			chargeTxtObj.setvisible(true);
			paymentTxtObj.setvisible(true);
		}
		if(itemName == 2) {
			certiTxtObj.settext("주민등록 (초본)");
		} else if(itemName == 3) {
			certiTxtObj.settext("주민등록 (등본)");
		} else if(expression == "농지원부농업경영체" || expression == "지방세세목별과세증명서" || expression == "교육제증명대학교(원)제외") {
			certiTxtObj.settext(itemName);
			certiTxtObj.setfont("Noto Sans CJK KR", 26, false, false, false, false);
		} else {
			certiTxtObj.settext(itemName);			
		}
		sumObj.settext(totalPayment);
		priceObj.settext(busu);
		chargeObj.settext(itemInfo2);
		paymentObj.settext(totalPayment);
}