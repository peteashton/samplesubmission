#!/Users/pda2/anaconda/bin/python

from __future__ import print_function, division

import cgi
import cgitb

cgitb.enable()
form = cgi.FieldStorage()

print("Content-type: text/html\n")
print("<html><head>")
print("<title>Genomics Lab Sample Submission Results</title>")
print("<link rel='stylesheet' href='/submission/submission.css' type='text/css' />")
print("</head>")
print("<body><div id='allcontent'>")
print("<h1>BTF Genomics Lab</h1><h2>Sample Submission</h2>")
print("<h3>Samples</h3>")
print("<table><thead><tr><th>Sample no.</th><th>Sample Type</th><th>Sample Identifier</th><th>Concentration (ng/&micro;l)</th><th>A260/A280</th><th>A260/A230</th></tr></thead></tbody>")
num_samples = int(form['samplenumber'].value)
for i in range(num_samples):
    print("<tr><td>%d</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" %
            (i+1, form['sampletype'+str(i+1)].value,
                  form['sampleid' + str(i+1)].value,
                  form['sampleconc' + str(i+1)].value,
                  form['sampleA260280' + str(i+1)].value,
                  form['sampleA260230' + str(i+1)].value))
print("</tbody></table>")
print("</div></body></html>")
