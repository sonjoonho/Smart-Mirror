import matplotlib.pyplot as plt
import numpy as np
import win32com.client as win32
import datetime
word = win32.Dispatch("Word.Application")
word.Visible = False
word.Documents.Open("C:\\Users\\Joonho\\Google Drive\\College\\EP\\ExtendedProjectDiary.docx")
doc = word.ActiveDocument

if doc.Tables.Count==0:
    print("No tables were found")
table = doc.Tables(1)
data = np.empty([table.Rows.Count+1,1])

n=0
weeks = []
#wordCounts = [0]*52
wordCounts=[]

for i in range(1,53):
    weeks.append(i)

    
for i in range(2, table.Rows.Count+1):
    wordCount = 0

    dateRaw = table.Cell(Row=i,Column=1).range.Text
    dateRaw = dateRaw.split()[0]
    dateRaw = dateRaw.split('/')
    day = int(dateRaw[0])
    month = int(dateRaw[1])

    d = datetime.date(2016, month, day)

    weekN = (d.isocalendar())[1]


    entry=table.Cell(Row=i,Column=2).range.Text
   
    wordCount = int(len(entry.split()))
    wordCounts.append(wordCount)
    n+=1
    
wordCounts.append(0)
    #print(wordCountTemp)
#    for j in weeks:
#        
#        if (int(weekN)==j):
#            wordCounts[j-1]= wordCounts[j-1]+wordCount



data = np.array([wordCounts])
print(data.shape)
data = data.reshape(6,9)
print(data.shape)
print(data)
column_labels = 'Wordcount'
row_labels = weeks
#data = np.random.rand(4,4)


    




fig, ax = plt.subplots()
heatmap = ax.pcolor(data, cmap=plt.cm.Blues, alpha=0.8)


# put the major ticks at the middle of each cell, notice "reverse" use of dimension
ax.set_yticks(np.arange(data.shape[0])+0.5, minor=False)
ax.set_xticks(np.arange(data.shape[1])+0.5, minor=False)


ax.set_xticklabels(row_labels, minor=False)
ax.set_yticklabels(column_labels, minor=False)
plt.show()