//const si = require('systeminformation');
import * as si from "systeminformation";
import sequelize from "./db";
import os from "os";

import cpu_model from "./models/cpu.model";
import mem_model from "./models/mem.model";
import os_model from "./models/os.model";
import disk_model from "./models/disk.model";
import cpu_load_model from "./models/cpu_load.model";
import process from './models/process.model'

// const sequelize = new Sequelize('collect', 'root', 'P@ssw0rd', {
//   host: '127.0.0.1',
//   dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

// sequelize.authenticate()
// .then(result => console.log('Connection has been established successfully.'))
// .catch(err => console.error('Unable to connect to the database:', err))

// promises style - new since version 3


sequelize.authenticate()
.then(_ => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err))


const Cpu = cpu_model(sequelize)
const Memory = mem_model(sequelize)
const Os = os_model(sequelize)
const Disk = disk_model(sequelize)
const CpuLoad = cpu_load_model(sequelize)
const Process = process(sequelize)


sequelize.sync({force: true})


const cpu_interval = () => {
  si.cpu()
  .then(data => {
    // console.log(data)
    Cpu.create({
      hostname: os.hostname(),
      manufacturer: data.manufacturer,
      brand: data.brand,
      vendor: data.vendor,
      cores: data.cores,
    })
    .then(_ => console.log('create success'))
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error));
}

const mem_interval = () => {
  si.mem()
  .then(data => {
    // console.log(data)
    Memory.create({
      hostname: os.hostname(),
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
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error));
}

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
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error));
}

interface Disk{
  fs: string;
  type: string;
  size: number;
  used: number;
  available: number;
  use: number;
  mount: string;
  hostname: string;
}

const disk_interval = () => {
  si.fsSize()
  .then(data => {
    console.log(data)
    let d: Disk[] = []
    data.forEach(value => {
      const obj = {hostname: os.hostname(), ...value}
      d.push(obj)
    });
    Disk.bulkCreate(d)
    .then(_ => console.log('create success'))
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error));
}

const cpu_load_interval = () => {
  si.currentLoad()
  .then(data => {
    // console.log(data)
    CpuLoad.create({
      hostname: os.hostname(),
      ...data
    })
    .then(_ => console.log('create success'))
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error));
}

interface Process{
  hostname: string,
  pid: number,
  parentPid: number
  name: string
  cpu: number
  cpuu: number
  cpus: number
  mem: number
  priority: number
  memVsz: number
  memRss: number
  nice: number
  started: string
  state: string
  tty: string
  user: string
  command: string
  path: string
  params: string
}

const process_interval = () => {
  si.processes()
  .then(data => {
    console.log(data)
    let p: Process[] = []
    data.list.forEach(value => {
      const obj = {hostname: os.hostname(), ...value}
      p.push(obj)
    });

    Process.bulkCreate(p)
    .then(_ => console.log('create success'))
    .catch(error => console.error(error))
  })
}

const startInterval = (callback: Function, time: number) => {
  callback()
  return setInterval(callback, time)
}

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
