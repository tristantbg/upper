<?php if(!defined('KIRBY')) exit ?>

title: Post-It
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  fullbleed:
    label: Full bleed / no title
    type: toggle
    default: no
    options: yes/no
    width: 1/2
  positionx:
    label: Position X
    type: number
    min: 0
    max: 100
    width: 1/3
  positiony:
    label: Position Y
    type: number
    min: 0
    max: 100
    width: 1/3
  positionz:
    label: Position Z
    type: number
    default: 1
    min: 0
    width: 1/3
  color:
    label: Override default color
    type: color
    help: Leave empty to keep main category color
    width: 1/2
  size:
    label: Size
    type: select
    required: true
    options:
      small: Small
      medium: Medium
      large: Large
    width: 1/2
  text:
    label: Text
    type:  textarea
  list:
    label: List
    type: structure
    style: table
    fields:
      left:
        label: Left
        type: textarea
      right:
        label: Right
        type: textarea