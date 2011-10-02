# Overview

The JTV Info Widget is a web based component that displays your Justin.TV channel's live viewers, followers and total channel views on your own website.  It does this by querying the Justin.TV API once every 60 seconds, caches the result on your web server, and provides an AJAX style updating display on your live stream page, right next to your JTV embedded viewer.

## Why is this needed?

For some reason, when you embed the Justin.TV viewer on your website, it doesn't display any statistics such as your live viewer count, followers or stream views.  You actually have to go to the Justin.TV website to find this out.  This widget uses the Justin.TV API to lookup those stats in near real time, and displays them on your site.

## Requirements

You'll need a web server to host the widget, which consists of some HTML, JavaScript and PHP files.  Your server will need PHP version 5 or higher, and you'll need some way to upload and manipulate files, such as an FTP program.  Shared hosting works fine, as long as they allow you to upload and run your own PHP scripts.

# Installation

Note: If you download the widget from GitHub, once you extract the archive you're going to get a folder named something crazy like "`jtv-info-widget-a541ed5`".  Please rename this folder so it is just plain old "`jtv-info-widget`".

To install the widget, first upload the entire "`jtv-info-widget`" folder to your web server via FTP, and make sure it is your public html area.  If you don't know where this is, consult your web hosting company, and ask where to place files to make them web accessible.  For example, when you connect to your website via FTP, you should see some sort of public html folder, which may be called "`public_html`", "`html`" or "`www`".  This is typically where you place files to make them load in a web browser.  Upload the "`jtv-info-widget`" so it goes *inside* your "`public_html`", "`html`" or "`www`" folder.

Now for the only tricky part.  Open the `jtv-info-widget` folder on your FTP server, and you'll find a "`cache`" folder.  This is where the widget caches data from the Justin.TV API (don't worry, it's only one or two small text files).  You need to set the permissions of this folder on your FTP server so the PHP script can read *and* write to it.  Most FTP apps have an easy way to do this.  Click on the "`cache`" folder, and look for a "Set Permmissions", "Set Privileges" or "Get Info" button or menu item.  The easiest way is to set it so *everyone* can read and write to the folder.  However, you might want to read this article first, which has very detailed instructions on doing this: <http://codex.wordpress.org/Changing_File_Permissions>

Next, make sure this URL works:

	http://_YOUR_DOMAIN_NAME/jtv-info-widget/test.html

Change `_YOUR_DOMAIN_NAME_` to your own domain name you use to access your website, and make sure the test page loads.  If you get a "File Not Found" error, then something went wrong.  Check to make sure you uploaded the folder to the correct location on your server, and you constructed the URL correctly.

If the page loads, and you see a live JTV stream, but you also get a "*Failed to save cache file to server...*" error, then something is wrong with the permissions on the `cache` folder.  Make sure you actually set the privileges so *everyone* can read and write to the folder.  The PHP script needs to write a small text file into this folder, and PHP scripts that run on the server have very limited permissions.  That is why we need to tweak the folder settings on the FTP server.

Once everything on the test page loads, and you see the info widget below the JTV player, then you are ready to customize and embed it on your own live page!

## Embedding The Widget

To embed the widget on your live page, copy & paste this code snippet into your HTML source code, and place it just under the JTV player:

	<div id="jtv_widget" channel="twit"></div>
	<script src="http://_YOUR_DOMAIN_HERE_/jtv-info-widget/widget.php"></script>

Now, you'll need to change two things before you save changes to your HTML file.  First, change the `channel="twit"` to your own Justin.TV Channel ID.  You can find this on your Justin.TV Channel URL.  Second, change the `_YOUR_DOMAIN_NAME_` to your own domain name you use to access your website.  That's it!

Save and reload your HTML page, and you should see the widget appear under your live stream.  Please note that it **only appears if you are actually live!**  If your channel is offline the widget will not appear.  This is because the Justin.TV API doesn't provide data for your channel unless it is actually live.

One last thing.  The widget attempts to auto-size itself so it is exactly the same width of your Justin.TV player on your page.  If for whatever reason this doesn't work, you can easily set the size of the widget by editing the CSS style like this:

	<div id="jtv_widget" channel="twit" style="width:500px;"></div>

Have fun!
