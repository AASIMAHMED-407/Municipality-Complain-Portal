from flask import Flask,request
import mysql.connector
# from flask_cors import CORS, cross_origin
from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app)
CORS(app)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="complaint"
)

mycursor = mydb.cursor()

# print(mydb)
# print(mycursor)

@app.route('/')
def root():
    return "ruuunig python ka server running"

# EMPLOYEE
@app.route('/employee',methods=["GET"])
def getAllEmployee():
     if request.method == 'GET':
        query = "SELECT * FROM employee;"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/employee/login',methods=["POST"])
# @cross_origin()
def verifyEmployeeLogin():
     if request.method == 'POST':
        data = request.json
        email = data.get("email")
        password = data.get("password")
        # print(email,password)
        query = f"SELECT * FROM employee WHERE employee_email='{email}' AND employee_password='{password}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/employee/<ID>',methods=["GET"])
def getEmployeeById(ID):
     if request.method == 'GET':
        query =  f"SELECT * FROM employee WHERE employee_id='{ID}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/employee/handle/complain/<ID>',methods=["GET"])
def employeeHandleComplainRequest(ID):
     if request.method == 'GET':
        query =  f"UPDATE complain SET complain_status = 'handling' WHERE complain_id='{ID}';"
        data = mycursor.execute(query)
        mydb.commit()
    # print(myresult)
        res = [data,"handling successfully"]
        return res

@app.route('/employee/finish/complain/<ID>',methods=["GET"])
def employeeHandleComplainFinish(ID):
     if request.method == 'GET':
        query =  f"UPDATE complain SET complain_status = 'finished' WHERE complain_id='{ID}';"
        data = mycursor.execute(query)
        mydb.commit()
    # print(myresult)
        res = [data,"finished successfully"]
        return res

@app.route("/employee/request/<employee_id>",methods=["GET"])
def get_employee_requests(employee_id):
    
    if request.method == "GET":
        try:
            query = f"SELECT complain_id FROM employee_works_on_complaint WHERE employee_id='{employee_id}'"
            data = mycursor.execute(query)
            complain_ids = mycursor.fetchall()
            # print(complain_ids)
            # return complain_ids

            requests = []


            for complain_id in complain_ids:
                inner_query = f"SELECT complain_id,complain_location,complain_date_in,complain_status,complain_desc FROM complain WHERE complain_id = '{complain_id[0]}' AND complain_status='request'"
                data = mycursor.execute(inner_query)
                complaint_datas = mycursor.fetchall()
                # print(complaint_data)
                # return complaint_data
                for cd in complaint_datas:
                    if cd:
                        requests.append({
                            "id": cd[0],
                            "location": cd[1],
                            "datein": cd[2],
                            "status": cd[3],
                            "desc": cd[4],
                        })
                    # print(cd)
                    # return complaint_datas

            return requests
            # return jsonify(requests)

        except Exception as e:
            print(f"Error: {e}")
        # return jsonify({"error": "Internal server error"}), 500

@app.route("/employee/handling/<employee_id>",methods=["GET"])
def get_employee_handling(employee_id):
    
    if request.method == "GET":
        try:
            query = f"SELECT complain_id FROM employee_works_on_complaint WHERE employee_id='{employee_id}'"
            data = mycursor.execute(query)
            complain_ids = mycursor.fetchall()
            # print(complain_ids)
            # return complain_ids

            requests = []


            for complain_id in complain_ids:
                inner_query = f"SELECT complain_id,complain_location,complain_date_in,complain_status,complain_desc FROM complain WHERE complain_id = '{complain_id[0]}' AND complain_status='handling'"
                data = mycursor.execute(inner_query)
                complaint_datas = mycursor.fetchall()
                # print(complaint_data)
                # return complaint_data
                for cd in complaint_datas:
                    if cd:
                        requests.append({
                            "id": cd[0],
                            "location": cd[1],
                            "datein": cd[2],
                            "status": cd[3],
                            "desc": cd[4],
                        })
                    # print(cd)
                    # return complaint_datas

            return requests
            # return jsonify(requests)

        except Exception as e:
            # return e
            print(f"Error: {e}")
        # return jsonify({"error": "Internal server error"}), 500


# DEPARTMENT
@app.route('/department/location/<location>',methods=["GET"])
def getDepartmentLocationById(location):
     if request.method == 'GET':
        query =  f"SELECT * FROM department WHERE department_location='{location}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult


@app.route('/department/employee/<did>',methods=["GET"])
def getEmployeesWorkingOnDepartmentId(did):
     if request.method == 'GET':
        query =  f"SELECT * FROM employee WHERE employee_work_on='{did}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult



# CITIZEN
@app.route('/citizen/register',methods=["POST"])
def citizenRegister():
     if request.method == 'POST':
        data = request.json
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        # print(name,email,password)
        query = f"INSERT INTO citizen(citizen_name,citizen_email,citizen_password)  VALUES(%s,%s,%s)"
        val = (name,email,password)
        data = mycursor.execute(query,val)
        myresult = mycursor.fetchall()
        mydb.commit()
    # print(myresult)
        return myresult

@app.route('/citizen/login',methods=["POST"])
def verifyCitizenLogin():
     if request.method == 'POST':
        data = request.json
        email = data.get("email")
        password = data.get("password")
        # print(email,password)
        query = f"SELECT * FROM citizen WHERE citizen_email='{email}' AND citizen_password='{password}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/citizen',methods=["GET"])
def getAllCitizen():
     if request.method == 'GET':
        query =  "SELECT * FROM citizen;"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/citizen/<ID>',methods=["GET"])
def getCitizenById(ID):
     if request.method == 'GET':
        query =  f"SELECT * FROM citizen WHERE citizen_id='{ID}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult


# def citizenMakeComplain(cid,comid):
#     query = f"INSERT INTO citizen_make_complaint(citizen_id,complain_id) VALUES(%s,%s)"
#     val = (cid,comid)
#     data = mycursor.execute(query,val)
#     mydb.commit()

# def employeeHandleComplain(eid,comid):
#     query = f"INSERT INTO employee_works_on_complaint(employee_id,complain_id) VALUES(%s,%s)"
#     val = (eid,comid)
#     data = mycursor.execute(query,val)
#     mydb.commit()

# def insertComplain(cl,cdate,cdesc,cstatus,cid,eid):
    # query = f"INSERT INTO complain(complain_location,complain_date_in,complain_desc,complain_status)  VALUES(%s,%s,%s,%s)"
    # val = (cl,cdate,cdesc,cstatus)
    # data = mycursor.execute(query,val)
    # comid = mycursor.lastrowid
    # mydb.commit()
    # citizenMakeComplain(cid,comid)
    # employeeHandleComplain(eid,comid)

@app.route('/citizen/make/complain',methods=["POST"])
def citizenMakeComplain():
     if request.method == 'POST':
            data = request.json
            # print(data)
            location = data.get("location")
            date = data.get("date")
            desc = data.get("desc")
            status = data.get("status")
            cid = data.get("cid")
            eid = data.get("eid")
            # insertComplain(location,date,desc,status,cid,eid)
            query = f"INSERT INTO complain(complain_location,complain_date_in,complain_desc,complain_status)  VALUES(%s,%s,%s,%s);"
            val = (location,date,desc,status)
            data = mycursor.execute(query,val)
            comid = mycursor.lastrowid

            querya = f"INSERT INTO employee_works_on_complaint(employee_id,complain_id) VALUES(%s,%s);"
            vala = (eid,comid)
            dataa = mycursor.execute(querya,vala)

            queryb = f"INSERT INTO citizen_make_complaint(citizen_id,complain_id) VALUES(%s,%s);"
            valb = (cid,comid)
            datab = mycursor.execute(queryb,valb)

            mydb.commit()
        
        
    # print(myresult)
            return "complain done"

@app.route('/citizen/complains/<ID>',methods=["GET"])
def getCitizenComplains(ID):
     if request.method == 'GET':
        query =  f"SELECT complain_id FROM citizen_make_complaint WHERE citizen_id='{ID}';"
        data = mycursor.execute(query)
        complain_ids = mycursor.fetchall()
        # print(myresult)
        requests = []
        for complain_id in complain_ids:
                inner_query = f"SELECT complain_id,complain_location,complain_date_in,complain_status,complain_desc FROM complain WHERE complain_id = '{complain_id[0]}' " #AND complain_status='request'
                data = mycursor.execute(inner_query)
                complaint_datas = mycursor.fetchall()
                # print(complaint_data)
                # return complaint_data
                for cd in complaint_datas:
                    if cd:
                        requests.append({
                            "id": cd[0],
                            "location": cd[1],
                            "datein": cd[2],
                            "status": cd[3],
                            "desc": cd[4],
                        })
        return requests


if __name__ == '__main__':
   app.run(debug=True)

