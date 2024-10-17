DELETE FROM COUNTER;
INSERT INTO COUNTER (cid, cName) VALUES (1, 'Counter 1');
INSERT INTO COUNTER (cid, cName) VALUES (2, 'Counter 2');
INSERT INTO COUNTER (cid, cName) VALUES (3, 'Counter 3');
INSERT INTO COUNTER (cid, cName) VALUES (4, 'Counter 4');


SELECT * from SERVICE;
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Delivery', 5, 'Express Delivery');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Shipping', 10, 'Ship Letters');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Payment', 20, 'Pay tax');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Account Management', 15, 'Open Account');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Phone manangment', 30, 'Create a number');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Others', 25, 'Do other operations');





DELETE FROM TICKET;

DELETE FROM COUNTER_SERVICE;
INSERT INTO COUNTER_SERVICE (cid,sid,date) VALUES (1, 1, '2024-10-16');
INSERT INTO COUNTER_SERVICE (cid, sid,date) VALUES (1, 2, '2024-10-16');
INSERT INTO COUNTER_SERVICE (cid,  sid,date) VALUES (1, 3, '2024-10-16');

INSERT INTO COUNTER_SERVICE (cid, sid,date) VALUES (2, 4, '2024-10-16');
INSERT INTO COUNTER_SERVICE (cid, sid,date) VALUES (2, 5, '2024-10-16');
INSERT INTO COUNTER_SERVICE (cid, sid,date) VALUES (2, 6, '2024-10-16');


SELECT * FROM COUNTER_SERVICE;
UPDATE TICKET SET cid = null,isServed=0 where date="2024-10-17"
SELECT * FROM TICKET;


