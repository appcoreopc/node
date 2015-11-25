package com.appcore.viewmodel

import play.api.libs.json.Json

/**
  * Created by Jeremy on 22/11/2015.
  */
case class Product (id :String, description : String, price : Double)

object Product {
  implicit val productReader = Json.writes[Product]
}
