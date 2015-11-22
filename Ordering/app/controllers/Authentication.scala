package controllers

/**
  * Created by Jeremy on 21/11/2015.
  */

import com.appcore.viewmodel.User
import play.api._
import play.api.mvc._

class
Authentication extends Controller {

  def authenticate(user : User) = Action {
    Ok("Authenticated")
  }
}
