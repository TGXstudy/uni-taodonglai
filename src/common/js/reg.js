const regs = {}
//判断日期类型是否为YYYY-MM-DD格式的类型
regs.isDate =  /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 
regs.isDateTime = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/

//判断日期类型是否为hh:mm:ss格式的类型  
regs.isTime = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/

//判断输入的字符是否为英文字母  
regs.isLetter = /^[a-zA-Z]+$/

//判断输入的字符是否为整数
regs.isInteger = /^[-+]?\d*$/

//判断输入的字符是否为双精度
regs.isDouble = /^[-\+]?\d+(\.\d+)?$/

//判断输入的字符是否为:a-z,A-Z,0-9    
regs.isString = /^[a-zA-Z0-9_]+$/

//判断输入的字符是否为中文
regs.isChinese = /^[\u0391-\uFFE5]+$/

//判断输入的EMAIL格式是否正确
regs.isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

//判断输入的邮编(只能为六位)是否正确
regs.isZIP = /^\d{6}$/

//判断输入的11位手机号是否正确
// regs.isPhone = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/
regs.isPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 固话
regs.isMob = /^[0-9-]{1,15}$/

//判断输入的mobile是否正确
regs.isMobile = /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/

//判断至多15位电话号码
regs.isTel = /^\d{1,15}$/

//判断输入的url格式是否正确
regs.isUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/

//判断输入的身份证号是否正确
regs.isIdCard =  /^\d{15}(\d{2}[A-Za-z0-9])?$/

//判断输入的QQ号格式是否正确
regs.isQQ = /^[1-9]\d{4,14}$/

//判断输入的IP格式是否正确
regs.isIP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/

//判断输入的字符串是否包含%&',;=?$特殊字符
regs.isSpecial = /^[^%&',;=?$\x22]+$/

//判断输入的密码格式以字母开头，长度在6-18之间，只能包含字符、数字和下划线
regs.pwd = /^[a-zA-Z]\w{5,17}$/

//判断金额最多只能有两位小数的正数
regs.price = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

//判断数字范围0.01-999999.99
regs.numRange = /^(([1-9][0-9]{0,5})|(([0]\.\d{1,2}|[1-9][0-9]{0,5}\.\d{1,2})))$/

//判断输入的字符是否为数字
regs.onlyNum = /^[0-9]+$/

//判断输入字符只能是数字和'-'
regs.numPhone = /^[0-9-]+$/

export default regs