+++
date =  {{ now.Format "2006-01-02" }}
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
slug = '{{ .File.ContentBaseName }}'
status = "seedling"
tags = []
+++
