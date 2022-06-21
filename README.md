# STF by Cat 

## As a user upload



 
    <% if (blog.comments.length) { %>
        <% blog.comments.forEach(function(c) {%>
          <label>Posted By</label> <br>
            <%= c.name %>
          <label>Comment</label> <br>
            <%= c.content %>
            <%= c.createdAt%>
        <% })%>
  





  </section>
