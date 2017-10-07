
//requires COMMON.JS to be loaded before this file.

function POFValidation(iElemsToValidate) {

    var objValids = new Object();

    this.objValSet;

    this.checkValidWithMsg = function (msg) {
        var i = 0;
        for (var obj in objValids) {
            if (objValids[obj] == false) {
                alert(msg);
                return false;
            }
            i++;
        }

        if (i >= iElemsToValidate) return true;

        alert(msg);
        return false;
    }

    this.checkValid = function() {
        var i = 0;
        for (var obj in objValids) {
            if (objValids[obj] == false) {
                alert('One or more fields are invalid!');
                return false;
            }
            i++;
        }

        if (i >= iElemsToValidate) return true;

        alert('One or more fields are invalid!');
        return false;
    };

    this.validateForm = function() {

        for (var i = 0; i < this.objValSet.length; i++) {
            var element = $(this.objValSet[i].elemName);
            for (var j = 0; j < this.objValSet[i].methods.length; j++) {
                var method = this[this.objValSet[i].methods[j].name];
                var args = this.objValSet[i].methods[j].args;

                switch (args.length) {
                    case 0:
                        method(element);
                        break;
                    case 1:
                        method(element, args[0]);
                        break;
                    case 2:
                        method(element, args[0], args[1]);
                        break;
                    case 3:
                        method(element, args[0], args[1], args[2]);
                        break;
                    case 4:
                        method(element, args[0], args[1], args[2], args[3]);
                        break;
                }
            }
        }
    };

    this.vDateCompare = function(elemDate1, elemDate2, strOperator, strOptMsg) {
        var valid = false;
        var date1 = new Date();
        var date2 = new Date();

        elemDate2 = $(elemDate2);

        if (elemDate1.value == "" || elemDate2.value == "") {
            removeErrorMessage(elemDate1, '_date');
            valid = true;
        } else {

            var year1 = parseInt(elemDate1.value.substr(0, 4));
            var month1 = parseInt(elemDate1.value.substr(5, 2));
            var day1 = parseInt(elemDate1.value.substr(8, 2));
            var year2 = parseInt(elemDate2.value.substr(0, 4));
            var month2 = parseInt(elemDate2.value.substr(5, 2));
            var day2 = parseInt(elemDate2.value.substr(8, 2));

            date1.setFullYear(year1, month1, day1);
            date2.setFullYear(year2, month2, day2);

            switch (strOperator) {
                case '==':
                    strOptMsg = (strOptMsg != null) ? strOptMsg : "Dates do not match";
                    if (date1 == date2) {
                        removeErrorMessage(elemDate1, '_date');
                        valid = true;
                    } else {
                        addErrorMessage(strOptMsg, elemDate1, '_date');
                        valid = false;
                    }
                    break;
                case '>':
                    strOptMsg = (strOptMsg != null) ? strOptMsg : "Date is too early";
                    if (date1 > date2) {
                        removeErrorMessage(elemDate1, '_date');
                        valid = true;
                    } else {
                        addErrorMessage(strOptMsg, elemDate1, '_date');
                        valid = false;
                    }
                    break;
                case '<':
                    strOptMsg = (strOptMsg != null) ? strOptMsg : "Dates is too late";
                    if (date1 < date2) {
                        removeErrorMessage(elemDate1, '_date');
                        valid = true;
                    } else {
                        addErrorMessage(strOptMsg, elemDate1, '_date');
                        valid = false;
                    }
                    break;
                case '>=':
                    strOptMsg = (strOptMsg != null) ? strOptMsg : "Date is too early";
                    if (date1 >= date2) {
                        removeErrorMessage(elemDate1, '_date');
                        valid = true;
                    } else {
                        addErrorMessage(strOptMsg, elemDate1, '_date');
                        valid = false;
                    }
                    break;
                case '<=':
                    strOptMsg = (strOptMsg != null) ? strOptMsg : "Date is too late";
                    if (date1 <= date2) {
                        removeErrorMessage(elemDate1, '_date');
                        valid = true;
                    } else {
                        addErrorMessage(strOptMsg, elemDate1, '_date');
                        valid = false;
                    }
                    break;
            }
        }

        objValids[elemDate1.name] = valid;
        return valid;
    }

    this.vCreditCard = function(elemCC, elemCCtype) {
        var iCCtype = parseInt($(elemCCtype).value);
        var valid = false;
        var filter;
        if (iCCtype == 1) {
            // Visa: length 16, prefix 4, dashes optional.
            filter = /^4\d{3}-?[\dX]{4}-?[\dX]{4}-?\d{4}$/;
        } else if (iCCtype == 2) {
            // Mastercard: length 16, prefix 51-55, dashes optional.
            filter = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
        } else if (iCCtype == 3) {
            // American Express: length 15, prefix 34 or 37.
            filter = /^3[4,7]\d{13}$/;
        } else if (iCCtype == 4) {
            // Discover: length 16, prefix 6011, dashes optional.
            filter = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
        }
        if (!filter.test(elemCC.value)) {
            addErrorMessage('Credit card number is invalid', elemCC, '_cc');
            valid = false;
        } else {
            removeErrorMessage(elemCC, '_cc');
            valid = true;
        }

        objValids[elemCC.name] = valid;
        return valid;
    }

    this.vEmpty = function(elemEmpty, strOptMsg, strOptDefaultVal) {
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value required";
        strOptDefaultVal = (strOptDefaultVal != null) ? strOptDefaultVal : "";
        var valid = false;
        if (elemEmpty.value == "" || elemEmpty.value == strOptDefaultVal) {
            addErrorMessage(strOptMsg, elemEmpty, '_empty');
            valid = false;
        } else {
            removeErrorMessage(elemEmpty, '_empty');
            valid = true;
        }

        objValids[elemEmpty.name] = valid;
        return valid;
    }

    this.vMinVal = function(elemMin, iMinVal, strOptMsg) {
        elemMin.value = elemMin.value.replace(/(?![\d\.])./g, '');
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value too low";
        var valid = false;
        if (parseFloat(elemMin.value) < iMinVal || elemMin.value == '') {
            addErrorMessage(strOptMsg, elemMin, '_minVal');
            valid = false;
        } else {
            removeErrorMessage(elemMin, '_minVal');
            valid = true;
        }

        objValids[elemMin.name] = valid;
        return valid;
    }

    this.vRangeVal = function(elemRange, iMinVal, iMaxVal, strOptMsg) {
        elemRange.value = elemRange.value.replace(/(?![\d\.])./g, '');
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value Not between " + iMinVal + " and " + iMaxVal;
        var valid = false;

        if (parseFloat(elemRange.value) < iMinVal || parseFloat(elemRange.value) > iMaxVal || elemRange.value == '') {
            addErrorMessage(strOptMsg, elemRange, '_rangeVal');
            valid = false;
        } else {
            removeErrorMessage(elemRange, '_rangeVal');
            valid = true;
        }

        objValids[elemRange.name] = valid;
        return valid;
    }

    this.vMaxVal = function(elemMax, iMaxVal, strOptMsg) {
        elemMax.value = elemMax.value.replace(/(?![\d\.])./g, '');
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value too high";
        var valid = false;
        if (parseFloat(elemMax.value) > iMaxVal || elemMax.value == '') {
            addErrorMessage(strOptMsg, elemMax, '_maxVal');
            valid = false;
        } else {
            removeErrorMessage(elemMax, '_maxVal');
            valid = true;
        }

        objValids[elemMax.name] = valid;
        return valid;
    }

    this.vMinValButAllowNull = function(elemMin, iMinVal, bypass, strOptMsg) {

        if (bypass == 1) {
            removeErrorMessage(elemMin, '_minVal');
            valid = true;

            objValids[elemMin.name] = valid;
            return valid;
        }

        elemMin.value = elemMin.value.replace(/(?![\d\.])./g, '');
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value too low";
        var valid = false;

        if (elemMin.value == "") {
            removeErrorMessage(elemMin, '_minVal');
            valid = true;
        }
        else if (parseFloat(elemMin.value) < iMinVal || elemMin.value == '') {
            addErrorMessage(strOptMsg, elemMin, '_minVal');
            valid = false;
        } else {
            removeErrorMessage(elemMin, '_minVal');
            valid = true;
        }

        objValids[elemMin.name] = valid;
        return valid;
    }

    this.vValMatch = function(elemToMatch, elemMatchWith, strTypeOfValue) {
        var valid = false;
        if (elemToMatch.value != $(elemMatchWith).value) {
            addErrorMessage(strTypeOfValue + ' do not match', elemToMatch, '_match');
            if (elemToMatch.value != "") elemToMatch.focus();
            valid = false;
        } else {
            removeErrorMessage(elemToMatch, '_match');
            valid = true;
        }

        objValids[elemToMatch.name] = valid;
        return valid;
    };

    this.vEmail = function(elemEmail) {
        var valid = false;

        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(elemEmail.value)) {
            addErrorMessage('Invalid Email Address', elemEmail, '_email');
            if (elemEmail.value != "") elemEmail.focus();
            valid = false;
        } else {
            removeErrorMessage(elemEmail, '_email');
            valid = true;
        }

        objValids[elemEmail] = valid;
        return valid;
    };

    this.vPassword = function(elemPass, flags) {

        var PASS_LOWER = 0x00000001;
        var PASS_UPPER = 0x00000002;
        var PASS_NUMBER = 0x00000004;
        var PASS_SYMBOL = 0x00000008;

        var valid = false;
        var strFilter = "^";
        var filter;

        if ((flags & PASS_LOWER) > 0) {
            strFilter += "(?=.*[a-z])";
        }
        if ((flags & PASS_UPPER) > 0) {
            strFilter += "(?=.*[A-Z])";
        }
        if ((flags & PASS_NUMBER) > 0) {
            strFilter += "(?=.*[0-9])";
        }
        if ((flags & PASS_SYMBOL) > 0) {
            strFilter += "(?=.*[`~@#%\^&\*\(\)=\-_\+\[\]\{\}\|;:\'\",\.<>\/\?])";
        }

        filter = new RegExp(strFilter, "g");

        if (!filter.test(elemPass.value)) {
            addErrorMessage('Password not strong enough.', elemPass, '_pass');
            if (elemPass.value != "") elemPass.focus();
            valid = false;
        } else {
            removeErrorMessage(elemPass, '_pass');
            valid = true;
        }

        objValids[elemPass.name] = valid;
        return valid;
    };

    this.vTrimPassword = function(elemPass) {

        var valid = false;
        var trimStrFilter = "^\\s+|\\s+$";
        var trimFilter = new RegExp(trimStrFilter, "g");

        if (trimFilter.test(elemPass.value)) {
            addErrorMessage('Please remove any leading or trailing spaces', elemPass, '_trim');
            if (elemPass.value != "") elemPass.focus();
            valid = false;
        } else {
            removeErrorMessage(elemPass, '_trim');
            valid = true;
        }

        objValids[elemPass.name] = valid;
        return valid;
    };

    this.vPasswordLength = function(elemPass, iMinLength) {
        var valid = false;
        var strFilter = "^.{" + iMinLength + ",}$";
        var filter = new RegExp(strFilter, "g");

        if (!filter.test(elemPass.value)) {
            addErrorMessage('Minimum 6 characters are required', elemPass, '_length');
            if (elemPass.value != "") elemPass.focus();
            valid = false;
        } else {
            removeErrorMessage(elemPass, '_length');
            valid = true;
        }

        objValids[elemPass.name] = valid;
        return valid;
    }

    this.vMinNumWords = function(elem, minWords, errMsg) {

        var value = elem.value;
        var count = 0;
        var words = value.replace(/\s/g, ' ');
        words = words.split(' ');

        for (i = 0; i < words.length; i++) {
            if (words[i].length > 0) {
                count++;
            }
        }

        var valid = false;

        if (count < minWords) {
            addErrorMessage(errMsg, elem, '_minWords');
            valid = false;
        } else {
            removeErrorMessage(elem, '_minWords');
            valid = true;
        }

        objValids[elem.name] = valid;
        return valid;
    }

    this.vMinNumChars = function(elem, minChars, errMsg) {

        var value = elem.value;
        var count = value.length;

        var valid = false;

        if (value == null || value == '')
            return true;

        if (count < minChars) {
            addErrorMessage(errMsg, elem, '_minChars');
            valid = false;
        } else {
            removeErrorMessage(elem, '_minChars');
            valid = true;
        }

        objValids[elem.name] = valid;
        return valid;
    }

    this.vPhone = function(elemPhone) {
        if (elemPhone.value != "") {
            var filter = /[\+0-9 \(\)-]+/g;
            var regEx = new RegExp(filter);
            if (!regEx.test(elemPhone.value))
                return false;
            elemPhone.value = elemPhone.value.match(filter).join("");
        }
        return true;
    };

    this.vName = function(elemName) {
        elemName.value = elemName.value.substring(0, 1).toUpperCase() + elemName.value.substring(1);

        return true;
    };

    this.vUpper = function(elemToUpper) {
        elemToUpper.value = elemToUpper.value.toUpperCase();

        return true;
    };
    this.vLower = function(elemToLower) {
        elemToLower.value = elemToLower.value.toLowerCase();

        return true;
    };

    this.wMaxVal = function(elemMax, iMaxVal, strOptMsg) {
        strOptMsg = (strOptMsg != null) ? strOptMsg : "Value too low";
        if (parseFloat(elemMax.value) > iMaxVal) {
            addErrorMessage(strOptMsg, elemMax, '_maxVal', 'warning');
        } else {
            removeErrorMessage(elemMax, '_maxVal');
        }
    }
}
