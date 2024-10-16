DELETE FROM COUNTER;
INSERT INTO COUNTER (cid, cName) VALUES (1, 'Counter 1');
INSERT INTO COUNTER (cid, cName) VALUES (2, 'Counter 2');
INSERT INTO COUNTER (cid, cName) VALUES (3, 'Counter 3');
INSERT INTO COUNTER (cid, cName) VALUES (4, 'Counter 4');

DELETE FROM SERVICE;
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Delivery', 5, 'Express Delivery');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Shipping', 10, 'Ship Letters');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Shipping', 20, 'Ship Parcels');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Account Management', 15, 'Open Account');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Account Management', 30, 'Close Account');
INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES ('Account Management', 25, 'Update Account');


DELETE FROM COUNTER_SERVICE;

DELETE FROM TICKET;
