function sendfeedback(sheet_url) {
    const find_email = /<td class="label">E-mail contactpersoon:<\/td>\s*<td>(.*)<\/td>/m;
    const feedback = document.getElementById('edit-culture-partner-feedback').querySelectorAll('fieldset');

    const pagelink = document.querySelector('#block-dynamo3-header > ul > li:nth-child(1) > a').href.split('/');
    const school = pagelink[5];
    const pageid = pagelink[6];
    const nid = window.location.href.split('/')[4];
        console.log(feedback);
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };

    fetch("https://www.cultuurkuur.be/node/"+nid+"/printable/print", myInit).then((res) => res.text()).then(function (data) {
        const matches = data.match(find_email);
        let email;
        if (matches) {
            email = matches[1];
        } else {
            email = "https://www.cultuurkuur.be/node/" + nid + "/printable/print";
        }
        email = encodeURI(email);

        feedback.forEach(function (panel) {
            encodeURIComponent
            let name = encodeURIComponent(panel.querySelector('legend').textContent.trim());
            let fb_text = encodeURIComponent(panel.querySelector('div.fieldset-wrapper textarea').value);
            const link = sheet_url + '?p_id=' + pageid + '&s=' + school + '&n=' + nid + '&e=' + email + '&p=' + name + '&fb=' + fb_text;
            panel.innerHTML = `<a href="${link}" target="_blank">❤ Like ❤</a>` + panel.innerHTML;
        });
    });
}
