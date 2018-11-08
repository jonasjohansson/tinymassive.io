# Creators Kit

These documents are provided for the super curious + detail oriented, they are intended mainly to show exactly how the lights are laid out on the buildings.

PAY NO ATTENTION TO THE CODES ON THE DIAGRAMS - they are for us to worry about, and some of them are wrong anyway.

ALSO NOTE - our 77 x 13 mapping does miss out some small rows, and one or two individual lights at the edges. They will remain black.

It is worth taking note of how the different 'pixels' of the facade are arranged relative to each other, i.e. they are not in a regular straight grid.

If in doubt, stick to the 77 x 13 grid.

In detail, from your app's perspective:

0,0 is the top-left light on the small facade
37,8 is the right-hand light on the lowest row on the small facade. (E3/S12/U5/46 on the overview cableing south facade small-a.pdf document)

38,0 is unmapped (because the light there doesn't exist)
38,1 is the top light on the left-most row on the large facade (E2/S10/U4/151 on the overview cableing facade south large-b.pdf document)
76,12 is actually unmapped (because the light there doesn't exist)
76,10 is the bottom-right light on the second-to-last row (E1/S1/U1/13 on overview cableing facade south large-b.pdf document)

## Tips and Tricks

-Better keep it bold and simple. Detailed visuals might lose against pixel art for example. -The video content on a building this big might appear faster, be modest with the speed. -Negative space is the key, the more black and contrast, the better the look
-Using audio to animate will help compensate the lack of pixels. Beat the beat.

## Templates

[TMSyphonVisualiser](TMSyphonVisualiser)

[TMTestAppInteractive](TMTestAppInteractive)

[Syphoner](http://www.sigmasix.ch/syphoner/)

### TouchDesigner

[TouchDesignerHarpaTemplate](TouchDesigner/HarpaTemplate.toe)

### After Effects

[AfterEffectsHarpaTemplate](AfterEffects/HarpaTemplate.aep)

This project is made on After Effects CC 2017 and comes with two types of compositions; WORKING and OUTPUT. The pixel space of the Working compositions is 16x larger than the actual output. This allows you to create on a reasonable size.

![](AfterEffects/HarpaTemplateGuide-1.jpg)

#### Getting started

The main working compositionm, and recommended starting point, is named WORKHERE_BothSides_16X. Though if needed, you can use the Left and Right compositions; WORKHERE_LeftSide_16X
WORKHERE_RightSide_16X.

What you see in the WORKING COMP
![](AfterEffects/HarpaTemplateGuide-2.jpg)

What you see in the OUTPUT COMP
![](AfterEffects/HarpaTemplateGuide-3.jpg)

Once you are done with Working on the creative side, you can output your work from two options:

1- Harpa2018_template_OUTPUT_Visualizer
This render can be used for the online Visualizer

2- Harpa2018_template_OUTPUT_System
This is the render for the system, your delivery format

![](AfterEffects/HarpaTemplateGuide-4.jpg)

I recommend that you duplicate the render settings for each output. And voila!
