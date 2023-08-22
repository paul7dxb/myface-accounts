using Microsoft.AspNetCore.Mvc;
using MyFace.Models.Request;
using MyFace.Models.Response;
using MyFace.Repositories;
using MyFace.Helpers;

namespace MyFace.Controllers
{
    [ApiController]
    [Route("/posts")]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepo _posts;
        private readonly IAuthHelper _authHelper;
        public PostsController(IPostsRepo posts, IAuthHelper authHelper)
        {
            _posts = posts;
            _authHelper = authHelper;
        }

        [HttpGet("")]
        public ActionResult<PostListResponse> Search([FromQuery] PostSearchRequest searchRequest)
        {
            var posts = _posts.Search(searchRequest);
            var postCount = _posts.Count(searchRequest);
            return PostListResponse.Create(searchRequest, posts, postCount);
        }

        [HttpGet("{id}")]
        public ActionResult<PostResponse> GetById([FromRoute] int id)
        {
            var post = _posts.GetById(id);
            return new PostResponse(post);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreatePostRequest newPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isAuthenticated = _authHelper.IsAuthenticated(Request);
            var isAuth = isAuthenticated.Item1;
            if (!isAuth)
            {

                return Unauthorized();
            }

            var userId = isAuthenticated.Item2;
            var post = _posts.Create(newPost, userId);

            var url = Url.Action("GetById", new { id = post.Id });
            var postResponse = new PostResponse(post);
            return Created(url, postResponse);
        }

        [HttpPatch("{id}/update")]
        public ActionResult<PostResponse> Update([FromRoute] int id, [FromBody] UpdatePostRequest update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = _posts.Update(id, update);
            return new PostResponse(post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {

            var isAuthenticated = _authHelper.IsAuthenticated(Request);
            var isAuth = isAuthenticated.Item1;
            var isAuthResponse = isAuthenticated.Item2;
            var isAdmin = isAuthenticated.Item3;

            if(!isAdmin){
                return Unauthorized();
            }

            _posts.Delete(id);
            return Ok();
        }
    }
}