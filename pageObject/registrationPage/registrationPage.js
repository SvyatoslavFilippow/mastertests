var RegistrationPage = function () {
  commonConf = require('../common.js'),
  helpers = new commonConf.Helpers(),
  cssInputWord = element(by.css('[id=\'textbox\'] [class=\'textbox\']')),
  cssWelcome = element(by.css('h2')),
  cssSuccessMessage = element(by.css('[class="success_message"]'));

  this.inputValue = function (cssInputValue, value) {
    helpers.waitElement(cssInputValue);
    cssInputValue.sendKeys(value);
  };

    this.clickButton = function (cssInputValue) {
        helpers.waitElement(cssInputValue);
        cssInputValue.click();
    };

       this.checkRegistration = function () {
           helpers.waitElement(cssSuccessMessage);
           expect(cssSuccessMessage.isDisplayed).toBe(true, "Регистрация не прошла успешно");
       };


  this.checkLogin = function (word) {
    helpers.waitElement(cssWelcome);
    expect(cssWelcome.getText()).toEqual(word);
    //expect(cssTranslateWord.getText()).toEqual(word);
  };

    this.checkLoginMasterTests = function () {
        helpers.waitElement(element(by.css('[id="exit_link"]')));
        browser.getCurrentUrl().then(function (str) {
            console.log(str);
            return str === 'http://master-test.net/ru#m=Config/t=';
            //mailUrl = 'http://master-test.net/ru#m=Config/t=';


        });
    }




};
module.exports = RegistrationPage;