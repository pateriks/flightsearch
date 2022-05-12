# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests
import json
import re
alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
dictOfAirports =[]
index = -1
for letter in alphabet:
    url = 'https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_'+letter
    response = requests.get(url)
    soup = BeautifulSoup(response.text,  'html5lib')
    table = soup.find('tbody')
    listOfFields = table.find_all('tr')
    currentPrefix = letter +'A'
    dictOfAirports.append({currentPrefix : []})
    index+=1


    for e in listOfFields:
        anchor = e.find('span')
        if anchor is not None:
            if anchor.attrs.get('id') is not None : 
                currentPrefix = anchor.attrs.get('id')
            if dictOfAirports.count({currentPrefix : []}) ==0 and currentPrefix is not None :
                print(currentPrefix)
                dictOfAirports.append({currentPrefix : []})
                index+=1

        innerInfo = e.find_all('td')
        if innerInfo:
            iata = innerInfo[0].get_text()
            airportName = innerInfo[2].get_text()
            if not airportName.isalpha() :
                if airportName.endswith(')') or airportName.endswith(']'):
                    airportName = re.sub(r'(\[\d{1}\])|(\((.*)*\))','',airportName)
            location = innerInfo[3].get_text().split(',')
            country = location.pop().strip()
            if not location:
                region = country
            else:
                region = location.pop(0).strip()
            dictOfAirports[index][currentPrefix].append({iata: {'airportName':airportName,'country':country,'region':region}})

with open("scripts/airports.json", "w",encoding='utf8') as outfile:
    json.dump(dictOfAirports, outfile,ensure_ascii=False,indent=4)
