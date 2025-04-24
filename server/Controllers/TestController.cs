using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    [HttpGet("GetProjects")]
    public ActionResult GetProjects()
    {
        return Ok(MockData.Projects);
    }

    // Important to 'Name' each Http request. It doesn't listen to just the function name
    [HttpGet("GetById")]
    public ActionResult GetById(int id)
    {
        var project = MockData.Projects.FirstOrDefault(p => p.Id == id);

        if(project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }
}