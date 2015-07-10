

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>NEMO Platform</title>

<%@include file="/core/sb-admin/sb-admin-style.jsp"%>

<style>
#dropdown .panel-body {
	padding: 0;
	background: #FDFDFD;
}

#dropdown .panel-body .nav>li>a {
	padding-left: 30px;
}

#page-wrapper .panel-body hr {
	margin: 0;
}

#page-wrapper .panel-body label {
	padding: 7px;
	margin-left: 10px;
	margin-bottom: 0;
	font-weight: normal;
}

#loading {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background-color: white;
	opacity: .6;
}

.ajax-loader {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -32px; /* -1 * image width / 2 */
	margin-top: -32px; /* -1 * image height / 2 */
	display: block;
}
</style>