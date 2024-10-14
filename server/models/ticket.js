function Ticket(tid, sid, cid, tCode, date, time, isServed, avgWaitTime) {
    this.tid = tid;
    this.sid = sid;
    this.cid = cid;
    this.tCode = tCode;
    this.date = date;   // TODO: possibly convert into a dayjs obj
    this.time = time;   // TODO: possibly convert into a dayjs obj
    this.isServed = isServed;   // in db have column isServed, type BOOLEAN, stores int values 0 (for false) and 1 (for true)
    this.avgWaitTime = avgWaitTime;
}

module.exports = Ticket;