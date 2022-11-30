import numpy as np
import cv2
import sys

img = cv2.imread(sys.argv[1])
# Convert to graycsale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Blur the image for better edge detection
img_blur = cv2.GaussianBlur(img_gray, (3,3), 0) 

edges = cv2.Canny(image=img_blur, threshold1=50, threshold2=50) # Canny Edge Detection

cv2.imwrite(sys.argv[1], edges)
