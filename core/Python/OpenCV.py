import numpy as np
import cv2

img = cv2.imread("./utils/testimg.png")
# Convert to graycsale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Blur the image for better edge detection
img_blur = cv2.GaussianBlur(img_gray, (3,3), 0) 

edges = cv2.Canny(image=img_blur, threshold1=50, threshold2=50) # Canny Edge Detection

cv2.imwrite("./utils/testimg.png", edges)
