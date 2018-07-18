<?php

kirbytext::$tags['slider'] = array(
  'html' => function($tag) {

    $html  = '<div class="slider js_slider">';
    $html .= '<div class="frame js_frame">';
    $html .= '<ul class="slides js_slides">';

    foreach($tag->page()->images()->filterBy('filename', '*=', $tag->attr('slider'))->sortBy('filename') as $slide) {
      $html .= '<li class="js_slide">';
      $html .= '<img src="' . $slide->width(1000)->url() . '">';
      $html .= '</li>';
    }

    $html .= '</ul></div>';
    $html .= ' <div class="js_prev prev"></div><div class="js_next next"></div>';
    $html .= '</div>';

    return $html;

  }
);