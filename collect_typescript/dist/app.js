"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const si = require('systeminformation');
const si = __importStar(require("systeminformation"));
const db_1 = __importDefault(require("./db"));
const os_1 = __importDefault(require("os"));
const cpu_model_1 = __importDefault(require("./models/cpu.model"));
const mem_model_1 = __importDefault(require("./models/mem.model"));
const os_model_1 = __importDefault(require("./models/os.model"));
const disk_model_1 = __importDefault(require("./models/disk.model"));
const cpu_load_model_1 = __importDefault(require("./models/cpu_load.model"));
const process_model_1 = __importDefault(require("./models/process.model"));
// const sequelize = new Sequelize('collect', 'root', 'P@ssw0rd', {
//   host: '127.0.0.1',
//   dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });
// sequelize.authenticate()
// .then(result => console.log('Connection has been established successfully.'))
// .catch(err => console.error('Unable to connect to the database:', err))
// promises style - new since version 3
db_1.default.authenticate()
    .then(_ => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
const Cpu = (0, cpu_model_1.default)(db_1.default);
const Memory = (0, mem_model_1.default)(db_1.default);
const Os = (0, os_model_1.default)(db_1.default);
const Disk = (0, disk_model_1.default)(db_1.default);
const CpuLoad = (0, cpu_load_model_1.default)(db_1.default);
const Process = (0, process_model_1.default)(db_1.default);
db_1.default.sync({ force: true });
const cpu_interval = () => {
    si.cpu()
        .then(data => {
        // console.log(data)
        Cpu.create({
            hostname: os_1.default.hostname(),
            manufacturer: data.manufacturer,
            brand: data.brand,
            vendor: data.vendor,
            cores: data.cores,
        })
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    })
        .catch(error => console.error(error));
};
const mem_interval = () => {
    si.mem()
        .then(data => {
        // console.log(data)
        Memory.create({
            hostname: os_1.default.hostname(),
            total: data.total,
            free: data.free,
            used: data.used,
            active: data.active,
            available: data.available,
            swaptotal: data.swaptotal,
            swapused: data.swapused,
            swapfree: data.swapfree
        })
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    })
        .catch(error => console.error(error));
};
const os_interval = () => {
    si.osInfo()
        .then(data => {
        // console.log(data)
        Os.create({
            platform: data.platform,
            distro: data.distro,
            release: data.release,
            kernel: data.kernel,
            arch: data.arch,
            hostname: data.hostname,
            serial: data.serial,
            build: data.build,
        })
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    })
        .catch(error => console.error(error));
};
const disk_interval = () => {
    si.fsSize()
        .then(data => {
        console.log(data);
        let d = [];
        data.forEach(value => {
            const obj = Object.assign({ hostname: os_1.default.hostname() }, value);
            d.push(obj);
        });
        Disk.bulkCreate(d)
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    })
        .catch(error => console.error(error));
};
const cpu_load_interval = () => {
    si.currentLoad()
        .then(data => {
        // console.log(data)
        CpuLoad.create(Object.assign({ hostname: os_1.default.hostname() }, data))
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    })
        .catch(error => console.error(error));
};
const process_interval = () => {
    si.processes()
        .then(data => {
        console.log(data);
        let p = [];
        data.list.forEach(value => {
            const obj = Object.assign({ hostname: os_1.default.hostname() }, value);
            p.push(obj);
        });
        Process.bulkCreate(p)
            .then(_ => console.log('create success'))
            .catch(error => console.error(error));
    });
};
const startInterval = (callback, time) => {
    callback();
    return setInterval(callback, time);
};
//cpu_interval;
startInterval(cpu_interval, 1000 * 10);
startInterval(mem_interval, 1000 * 10);
startInterval(os_interval, 1000 * 10);
startInterval(disk_interval, 1000 * 10);
startInterval(cpu_load_interval, 1000 * 10);
startInterval(process_interval, 1000 * 60 * 5);
// si.currentLoad()
// .then(data => console.log(data))
// .catch(error => console.error(error));
// si.osInfo()
// .then(data => console.log(data))
// .catch(error => console.error(error));
// si.processLoad("*", )
// .then(data => {
//   console.log(1111111111111111111)
//   console.log(data)
// })
// .catch(error => console.error(error));
// si.services("*")
// .then(data => console.log(data))
// .catch(error => console.error(error));
