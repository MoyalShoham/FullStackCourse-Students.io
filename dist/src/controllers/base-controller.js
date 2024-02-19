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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.name) {
                    const item = yield this.itemModel.find({ name: req.query.name });
                    res.status(200).json(item);
                }
                else {
                    const item = yield this.itemModel.find();
                    res.status(200).json(item);
                }
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.itemModel.findById(req.params.id);
                if (!item) {
                    return res.status(404).send('not found');
                }
                else {
                    res.status(200).send(item);
                }
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send('Post Student!' + req.body);
            try {
                const item = yield this.itemModel.create(req.body);
                res.status(201).send(item);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.itemModel.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).send(item._id);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.itemModel.findByIdAndDelete(req.params.id);
                res.status(200).send();
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base-controller.js.map