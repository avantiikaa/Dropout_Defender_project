import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv("data/student_dropout_dataset.csv")  

df.columns = df.columns.str.strip().str.lower()

pass_count = df["overall status"].str.strip().str.lower().eq("clear").sum()
drop_count = df["overall status"].str.strip().str.lower().ne("clear").sum()

labels = ["Passed", "Dropped Out"]
sizes = [pass_count, drop_count]
colors = ["#4CAF50", "#FF5733"]  # Green for pass, Red for drop

plt.rcParams.update({'font.size': 8})  
plt.figure(figsize=(2.5, 2.5))  
plt.pie(sizes, labels=labels, autopct="%1.1f%%", colors=colors, 
        startangle=140, wedgeprops={"edgecolor": "white"}, pctdistance=0.85)

plt.title("Student Pass vs Dropout", fontsize=10)  
plt.show()
