<?php

echo

'<div class="modal-dialog width-350px" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="section-title">
                <h2>Reset Password</h2>
                <p>Enter your sign in email where we will send you new generated password.</p>
            </div>
        </div>
        <div class="modal-body">
            <form class="form inputs-underline">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your email">
                </div>
                <!--end form-group-->
                <div class="form-group center">
                    <button type="submit" class="btn btn-primary width-100">Send me new password</button>
                </div>
                <!--end form-group-->
            </form>
            <!--end form-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->

';