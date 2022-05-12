import PIL.Image
import numpy
import requests
import shutil

witdh = 600
height = 300
alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']


image_save_location = "./src/data/logos/notAvailable.png"
notAvailableImage = PIL.Image.open(image_save_location)
for first_letter in alphabet :
    for second_letter in alphabet : 
        airline_code = first_letter + second_letter
        image_url = 'https://daisycon.io/images/airline/?width='+str(witdh)+'&height='+str(height)+'&color=ffffff&iata='+airline_code
        image_save_location = "./src/data/logos/"+first_letter+"/"+airline_code+".png"
        
        res = requests.get(image_url,stream=True)
        res2 = requests.get(image_url,stream=True)
        print(res.raw == res2.raw)

        with open(image_save_location ,"wb") as f:
            shutil.copyfileobj(res.raw,f)
        f.close()

        image = PIL.Image.open(image_save_location)
        
        image_array = numpy.array(image.convert("RGB"))
        image_array2 = numpy.array(image.convert("RGB"))
        print (not numpy.bitwise_xor(image_array,image_array2).any())
        if airline_code == "ag":
            notAvailableImage.show()
            image.show()
            print("brak")
            break
        first = True
        first_row = 0
        last_row = height

        for i in range(height) :
            if image_array[i,:].max() == image_array[i,:].min() and image_array[i,:].max() == 255:
                if not first:
                    last_row = i-1
                    break
            else :
                if first:
                    first_row = i
                    first = False

        left, right, top, bottom = (0, witdh, first_row, last_row)
        image.crop((left, top, right, bottom)).save("./src/data/logos/"+first_letter+"/"+airline_code+".png")
    break