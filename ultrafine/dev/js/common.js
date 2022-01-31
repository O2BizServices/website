
const DEV_URL = 'https://un137lb64l.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/UFC/';
const QA_URL = 'https://nchbzfmmu5.execute-api.ap-south-1.amazonaws.com/qa/api/v1/UFC/';
const PROD_URL = 'https://t21urj33n9.execute-api.ap-south-1.amazonaws.com/prod/api/v1/UFC/';
const UAT_URL = ' https://ut8olba8ia.execute-api.us-east-2.amazonaws.com/uat/api/v1/UFC/';

const DESKTOP = "DESKTOP";
const MOBILE = "MOBILE";
const WEB = "WEB";
const COMMON = "COMMON";

const DEV = 'DEV';
const QA = 'QA';
const PROD = 'PROD';
const UAT = 'UAT';

const activeProfile = DEV;

/**
 * This method use to get aws server url base on active profile.
 * @returns string Active profile server url.
 */
function getServerUrl() {
    if (activeProfile == DEV) {
      return DEV_URL;
    } else if (activeProfile == QA) {
      return QA_URL;
    } else if (activeProfile == PROD) {
      return PROD_URL;
    }else if (activeProfile == UAT) {
      return UAT_URL;
    }
    return '';
  }

  function showErrorAlert(message,parent) {
    var errorMessage = '<div class="alert alert-danger solid alert-dismissible alert-alt fade show">';
    errorMessage += '<button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span></button>';
    errorMessage += message;
    errorMessage += '</div>';
    $('#'+parent).html(errorMessage);
  }

  function showSuccessAlert(message,parent) {
    var errorMessage = '<div class="alert alert-success solid alert-dismissible fade show">';
    errorMessage += '<button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span></button>';
    errorMessage += message;
    errorMessage += '</div>';
    $('#'+parent).html(errorMessage);
  }