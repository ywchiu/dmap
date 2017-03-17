<?php

echo

'<div class="modal-dialog width-400px" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="section-title">
                <h2>Register</h2>
            </div>
        </div>
        <div class="modal-body">
            <form class="form inputs-underline">
                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        <div class="form-group">
                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First name">
                        </div>
                        <!--end form-group-->
                    </div>
                    <!--end col-md-6-->
                    <div class="col-md-6 col-sm-6">
                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last name">
                        </div>
                        <!--end form-group-->
                    </div>
                    <!--end col-md-6-->
                </div>
                <!--enr row-->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Email">
                </div>
                <!--end form-group-->
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Password">
                </div>
                <!--end form-group-->
                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm Password">
                </div>
                <!--end form-group-->
                <div class="form-group center">
                    <button type="submit" class="btn btn-primary width-100">Register Now</button>
                </div>
                <!--end form-group-->
            </form>

            <hr>

            <p class="center note">By clicking on “Register Now” button you are accepting the <a href="terms-and-conditions.html" class="underline">Terms & Conditions</a></p>
            <!--end form-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->';