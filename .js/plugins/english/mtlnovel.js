"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var MTLNovel = /** @class */ (function () {
    function MTLNovel() {
        this.id = "mtlnovel";
        this.name = "MTL Novel";
        this.version = "1.0.0";
        this.icon = "src/en/mtlnovel/icon.png";
        this.site = "https://www.mtlnovel.com/";
        this.baseUrl = this.site;
    }
    MTLNovel.prototype.popularNovels = function (pageNo, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, loadedCheerio, novels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUrl, "alltime-rank/page/").concat(pageNo);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (result) { return result.text(); })];
                    case 1:
                        body = _a.sent();
                        console.log(body);
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio("div.box.wide").each(function () {
                            var novelName = loadedCheerio(this)
                                .find("a.list-title")
                                .text()
                                .slice(4);
                            var novelCover = loadedCheerio(this).find("amp-img").attr("src");
                            var novelUrl = loadedCheerio(this).find("a.list-title").attr("href");
                            if (!novelUrl)
                                return;
                            var novel = {
                                name: novelName,
                                cover: novelCover,
                                url: novelUrl,
                            };
                            novels.push(novel);
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    MTLNovel.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            function getChapters() {
                return __awaiter(this, void 0, void 0, function () {
                    var listResult, listBody, chapter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(chapterListUrl)];
                            case 1:
                                listResult = _a.sent();
                                return [4 /*yield*/, listResult.text()];
                            case 2:
                                listBody = _a.sent();
                                loadedCheerio = (0, cheerio_1.load)(listBody);
                                chapter = [];
                                loadedCheerio("div.ch-list")
                                    .find("a.ch-link")
                                    .each(function () {
                                    var chapterName = loadedCheerio(this)
                                        .text()
                                        .replace("~ ", "");
                                    var releaseDate = null;
                                    var chapterUrl = loadedCheerio(this).attr("href");
                                    if (chapterUrl) {
                                        chapter.push({
                                            url: chapterUrl,
                                            name: chapterName,
                                            releaseTime: releaseDate,
                                        });
                                    }
                                });
                                return [2 /*return*/, chapter.reverse()];
                        }
                    });
                });
            }
            var url, headers, body, loadedCheerio, novel, chapterListUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = novelUrl;
                        headers = {
                            Referer: "".concat(this.baseUrl, "alltime-rank/"),
                        };
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url, {
                                method: "GET",
                                headers: headers,
                            }).then(function (result) { return result.text(); })];
                    case 1:
                        body = _b.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            url: url,
                            chapters: [],
                        };
                        novel.name = loadedCheerio("h1.entry-title").text();
                        novel.cover = loadedCheerio(".nov-head > amp-img").attr("src");
                        novel.summary = loadedCheerio("div.desc > h2").next().text().trim();
                        novel.author = loadedCheerio("#author").text();
                        novel.status = loadedCheerio("#status").text();
                        novel.genres = loadedCheerio("#genre").text().replace(/\s+/g, "");
                        chapterListUrl = url + "chapter-list/";
                        _a = novel;
                        return [4 /*yield*/, getChapters()];
                    case 2:
                        _a.chapters = _b.sent();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    MTLNovel.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl).then(function (r) { return r.text(); })];
                    case 1:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterText = loadedCheerio("div.par").html() || '';
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    MTLNovel.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var searchUrl, res, result, novels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchUrl = this.baseUrl +
                            "wp-admin/admin-ajax.php?action=autosuggest&q=" +
                            searchTerm +
                            "&__amp_source_origin=https%3A%2F%2Fwww.mtlnovel.com";
                        return [4 /*yield*/, fetch(searchUrl)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        result = _a.sent();
                        novels = [];
                        result.items[0].results.map(function (item) {
                            var novelName = item.title.replace(/<\/?strong>/g, "");
                            var novelCover = item.thumbnail;
                            var novelUrl = item.permalink.replace("https://www.mtlnovel.com/", "");
                            var novel = { name: novelName, cover: novelCover, url: novelUrl };
                            novels.push(novel);
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    MTLNovel.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, fetch_1.fetchFile)(url)];
            });
        });
    };
    return MTLNovel;
}());
exports.default = new MTLNovel();