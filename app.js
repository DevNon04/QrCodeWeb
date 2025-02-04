var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const glob = require('glob');

// Config đa ngôn ngữ
const i18n = require("i18n");
i18n.configure({
    locales: [
        "af",
        "sq",
        "am",
        "ar",
        "hy",
        "az",
        "eu",
        "be",
        "bn",
        "bs",
        "bg",
        "ca",
        "ceb",
        "zh-CN",
        "zh-TW",
        "co",
        "hr",
        "cs",
        "da",
        "nl",
        "en",
        "eo",
        "et",
        "fi",
        "fr",
        "fy",
        "gl",
        "ka",
        "de",
        "el",
        "gu",
        "ht",
        "ha",
        "haw",
        "iw",
        "hi",
        "hmn",
        "hu",
        "is",
        "ig",
        "id",
        "ga",
        "it",
        "ja",
        "jw",
        "kn",
        "kk",
        "km",
        "ko",
        "ku",
        "ky",
        "lo",
        "la",
        "lv",
        "lt",
        "lb",
        "mk",
        "mg",
        "ms",
        "ml",
        "mt",
        "mi",
        "mr",
        "mn",
        "my",
        "ne",
        "no",
        "ny",
        "ps",
        "fa",
        "pl",
        "pt",
        "pa",
        "ro",
        "ru",
        "sm",
        "gd",
        "sr",
        "st",
        "sn",
        "sd",
        "si",
        "sk",
        "sl",
        "so",
        "es",
        "su",
        "sw",
        "sv",
        "tl",
        "tg",
        "ta",
        "te",
        "th",
        "tr",
        "uk",
        "ur",
        "uz",
        "vi",
        "cy",
        "xh",
        "yi",
        "yo",
        "zu"],
    directory: __dirname + '/language',
    cookie: 'lang',
    header: 'accept-language'
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var qrTextRouter = require('./routes/qrtext');
var qrPhoneRouter = require('./routes/qrphone');
var qrEmailRouter = require('./routes/qremail');
var qrWifiRouter = require('./routes/qrwifi');

var app = express();

//Áp dụng ngôn ngữ cho trang web
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/qrText', qrTextRouter);
app.use('/qrPhone',qrPhoneRouter)
app.use('/qrEmail',qrEmailRouter)
app.use('/qrWifi',qrWifiRouter)

// // Config start
// //Đọc các file json có trong folder language
// var language_dict = {};
// glob.sync('../language/*.json').forEach(function (file) {
//     let dash = file.split("/");
//     if (dash.length == 3) {
//         let dot = dash[2].split(".");
//         if (dot.length == 2) {
//             let lang = dot[0];
//             fs.readFile(file, function (err, data) {
//                 language_dict[lang] = JSON.parse(data.toString());
//             });
//         }
//     }
// });
// // viết câu lệnh xử lý khi người dùng truy cập trang chủ mắc định sẽ hiển thị tiếng anh
// app.get('/', function (req, res) {
//     let lang = 'en';
//     console.log(lang);
//     i18n.setLocale(req, 'en')
//     res.render('index', {lang: lang})
// })
//
// // viết câu lệnh xử lý khi người dùng truy cập trang có ngôn ngữ cụ thể :
// // ví dụ : https://dotsave.app/en
// app.get('/:lang', function (req, res, next) {
//     // lấy ra địa chỉ truy vấn
//     console.log("Not index")
//     const q = req.url;
//     // tách ra language code từ địa chỉ truy vấn
//     let dash = q.split("/");
//     let lang = undefined
//     if (dash.length >= 2) {
//         let code = dash[1];
//         console.log(language_dict)
//         console.log('code = ' + code)
//         console.log(language_dict[code])
//         if (code !== '' && language_dict.hasOwnProperty(code)) {
//             lang = code;
//             console.log('AAAA' + lang)
//         } else {
//             next(createError(404))
//             return
//         }
//     }
//     if (lang == undefined) lang = 'en'
//     i18n.setLocale(req, lang)
//     res.render('index', {lang: lang})
// })
// // Config end


// Config window start
const language_dict = {};
// glob.sync('./language/*.json').forEach(function (file) {
//     let dash = file.split("\\");
//     if (dash.length == 2) {
//         let dot = dash[1].split(".");
//         if (dot.length == 2) {
//             let lang = dot[0];
//             fs.readFile(file, function (err, data) {
//                 language_dict[lang] = JSON.parse(data.toString());
//             });
//         }
//     } else {
//         console.log("lkkkk")
//     }
// });
glob.sync('./language/*.json').forEach(function (file) {
    let dash = file.split("/");
    if (dash.length == 2) {
        let dot = dash[1].split(".");
        if (dot.length == 2) {
            let lang = dot[0];
            fs.readFile(file, function (err, data) {
                language_dict[lang] = JSON.parse(data.toString());
            });
        }
    }
});
app.get('/', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('index', {lang: lang})
})

app.get('/text', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('qrtext', {lang: lang})
})
app.get('/bank', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('qrbank', {lang: lang})
})
app.get('/wifi', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('qrwifi', {lang: lang})
})
app.get('/phone', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('qrphone', {lang: lang})
})
app.get('/email', function (req, res) {
    let lang = 'en';
    console.log(lang);
    i18n.setLocale(req, 'en')
    res.render('qremail', {lang: lang})
})

app.get('/:lang?', function (req, res, next) {
    // lấy ra địa chỉ truy vấn
    console.log("Not index")
    const q = req.url;
    // tách ra language code từ địa chỉ truy vấn
    let dash = q.split("/");
    let lang = undefined
    if (dash.length >= 2) {
        let code = dash[1];
        console.log(language_dict)
        console.log('code = ' + code)
        console.log(language_dict[code])
        if (code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
            console.log('AAAA' + lang)
        } else {
            next(createError(404))
            return
        }
    }
    if (lang == undefined) lang = 'en'
    i18n.setLocale(req, lang)
    res.render('index', {lang: lang})
})
app.get('/:lang?/text', function (req, res, next) {
    // lấy ra địa chỉ truy vấn
    console.log("Not index")
    const q = req.url;
    // tách ra language code từ địa chỉ truy vấn
    let dash = q.split("/");
    let lang = undefined
    if (dash.length >= 2) {
        let code = dash[1];
        console.log(language_dict)
        console.log('code = ' + code)
        console.log(language_dict[code])
        if (code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
            console.log('AAAA' + lang)
        } else {
            next(createError(404))
            return
        }
    }
    if (lang == undefined) lang = 'en'
    i18n.setLocale(req, lang)
    res.render('qrtext', {lang: lang})
})
app.get('/:lang?/phone', function (req, res, next) {
    // lấy ra địa chỉ truy vấn
    console.log("Not index")
    const q = req.url;
    // tách ra language code từ địa chỉ truy vấn
    let dash = q.split("/");
    let lang = undefined
    if (dash.length >= 2) {
        let code = dash[1];
        console.log(language_dict)
        console.log('code = ' + code)
        console.log(language_dict[code])
        if (code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
            console.log('AAAA' + lang)
        } else {
            next(createError(404))
            return
        }
    }
    if (lang == undefined) lang = 'en'
    i18n.setLocale(req, lang)
    res.render('qrphone', {lang: lang})
})
app.get('/:lang?/email', function (req, res, next) {
    // lấy ra địa chỉ truy vấn
    console.log("Not index")
    const q = req.url;
    // tách ra language code từ địa chỉ truy vấn
    let dash = q.split("/");
    let lang = undefined
    if (dash.length >= 2) {
        let code = dash[1];
        console.log(language_dict)
        console.log('code = ' + code)
        console.log(language_dict[code])
        if (code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
            console.log('AAAA' + lang)
        } else {
            next(createError(404))
            return
        }
    }
    if (lang == undefined) lang = 'en'
    i18n.setLocale(req, lang)
    res.render('qremail', {lang: lang})
})
app.get('/:lang?/wifi', function (req, res, next) {
    // lấy ra địa chỉ truy vấn
    console.log("Not index")
    const q = req.url;
    // tách ra language code từ địa chỉ truy vấn
    let dash = q.split("/");
    let lang = undefined
    if (dash.length >= 2) {
        let code = dash[1];
        console.log(language_dict)
        console.log('code = ' + code)
        console.log(language_dict[code])
        if (code !== '' && language_dict.hasOwnProperty(code)) {
            lang = code;
            console.log('AAAA' + lang)
        } else {
            next(createError(404))
            return
        }
    }
    if (lang == undefined) lang = 'en'
    i18n.setLocale(req, lang)
    res.render('qrwifi', {lang: lang})
})

//config window end


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
