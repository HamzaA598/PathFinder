from djongo import models
import datetime

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
    dob = models.DateField(default=datetime.date(2000, 1, 1))
    highSchoolSystem = models.CharField(max_length=100)
    governorate = models.CharField(max_length=100, default="Cairo")
    gradeInHighSchool = models.CharField(max_length=100)
    preferences = models.TextField()
    feedback = models.TextField()


class University(models.Model):
    _id = models.CharField(primary_key=True, max_length=50)
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
    _id = models.CharField(primary_key=True, max_length=50)
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
#   ForeignKey
    university = models.CharField(blank=True,  max_length=50)

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
    title = models.CharField(max_length=50)
    description = models.TextField()
    date = models.DateField()
    college = models.CharField(blank=True, null=True, max_length=50)
    university = models.CharField(blank=True, null=True, max_length=50)
