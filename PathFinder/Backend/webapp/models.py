from djongo import models

class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    
class UniversityAdmin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)

class CollegeAdmin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    age = models.IntegerField()
    preferences = models.TextField()
    gradeInHighSchool = models.CharField(max_length=100)
    highSchoolSystem = models.CharField(max_length=100)
    feedback = models.TextField()
    
class University(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    Address = models.TextField()
    description = models.TextField()
    admin = models.OneToOneField(UniversityAdmin, on_delete=models.CASCADE, blank=True,)
    FacebookPage = models.CharField(max_length=100)
    Fax = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=50)
    Rank = models.CharField(max_length=10)
    UniversityPresidents = models.CharField(max_length=50)
    Website = models.CharField(max_length=50)
    YearFounded = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class College(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    Address = models.TextField()
    BriefHistory = models.TextField()
    Website = models.URLField()
    noOfYears = models.IntegerField()
    noOfStudents = models.IntegerField()
    collegeType = models.CharField(max_length=100)
    fees = models.IntegerField()    
    admin = models.OneToOneField(CollegeAdmin, on_delete=models.CASCADE, blank=True)
    AdmissionCertificates = models.CharField(max_length=200)
    AdmissionRequirements = models.CharField(max_length=200)
    CreditHours = models.CharField(max_length=20)
    Departments = models.CharField(max_length=220)
    FacebookPage = models.CharField(max_length=100)
    FacultyDeans = models.CharField(max_length=100)
    MasterPrograms = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=100)
    SpecializationYear = models.CharField(max_length=100)
    YearFounded = models.CharField(max_length=50)


    university = models.ForeignKey(University, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.name
    
class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    thresholdGpa = models.FloatField()
    colleges = models.ForeignKey(College, on_delete=models.CASCADE)

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    maxStudents = models.IntegerField()
    creditHours = models.IntegerField()
    departments = models.ForeignKey(Department, on_delete=models.CASCADE)
    
class Announcement(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    date = models.DateField()
    colleges = models.ForeignKey(College, on_delete=models.CASCADE, blank=True, null=True)