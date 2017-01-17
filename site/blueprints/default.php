<?php if(!defined('KIRBY')) exit ?>

title: Page
pages:
  template: postit
files: true
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  color:
    label: Post-it Color
    type: color
    required: true
    width: 1/2
  text:
    label: Text
    type:  textarea