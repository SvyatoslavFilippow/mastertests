describe('Вход в Master Test', function () {
    var commonConf = require('../../pageObject/common.js'),
        myEmail,
        registrationPage = new commonConf.RegistrationPage(),
        helpers = new commonConf.Helpers(),
        urlMasterTest = 'http://master-test.net/ru',
        password = 'Qweasdzxc',
        welcomeText= 'Добро пожаловать в Систему Мастер-Тест!',
        butReg = element(by.css('[value="Регистрация"]')),
        cssButRegEnd = element(by.css('[value="Зарегистрироваться"]')),
        cssButExit = element(by.css('[id="exit_link"]')),
        cssInputName = element(by.css('[name="name"]')),
        inputName = 'testName',
        cssInputSurname = element(by.css('[name="surname"]')),
        inputSurname = 'testSurname';
        cssInputEmail = element(by.css('[name="email"]')),
        cssInputPassword = element(by.css('[name="password"]')),
        cssInputCode = element(by.css('[name="code"]')),
        cssButContinue = element(by.css('[value="Продолжить"]')),
        divSuccess = element(by.css('[class="success_message"]')),
        butEnter = element(by.css('[name="submit"]'));

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        browser.get(urlMasterTest);
    });

    it('1. Регистрация', function () {
        nowInt = helpers.getNowDateToInt();
        myEmail = nowInt.toString() + helpers.getDomainName();
        registrationPage.inputValue(cssInputName, inputName);
        registrationPage.inputValue(cssInputSurname, inputSurname);
        registrationPage.inputValue(cssInputEmail, myEmail);
        registrationPage.inputValue(cssInputPassword, password);
        registrationPage.clickButton(cssButRegEnd);
        browser.sleep(5000);
        md5HashOfEmail = helpers.md5Hash(myEmail);
        codeFromEmail = helpers.getCodeFromEmail(md5HashOfEmail);
        browser.sleep(5000);

        registrationPage.inputValue(cssInputCode, 'здесь код из письма');
        registrationPage.clickButton(cssButContinue);
        registrationPage.checkRegistration();
        browser.get(urlMasterTest);
        registrationPage.clickButton(cssButExit);
    });


    it('2. Ввод логина и пароля', function () {
        registrationPage.inputValue(cssInputEmail, myEmail);
        registrationPage.inputValue(cssInputPassword, password);
        registrationPage.inputValue(cssInputPassword, 'protractor.Key.ENTER');
        registrationPage.checkLogin(welcomeText);

    });

});