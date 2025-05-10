using Microsoft.AspNetCore.Mvc;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly AppDbContext data;

    public TestController(AppDbContext _data)
    {
        data = _data;
    }

    [HttpGet("GetProjects")]
    public ActionResult GetProjects()
    {
        return Ok(MockData.MockProjectsList);
    }

    // Important to 'Name' each Http request. It doesn't listen to just the function name
    [HttpGet("GetById")]
    public ActionResult GetById(int id)
    {
        var project = data.Projects.FirstOrDefault(p => p.Id == id);

        if(project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll()
    {
        var projects = data.Projects.ToList();
        return Ok(projects);
    }

    [HttpPost("AddProject")]
    public ActionResult AddProject(Project project)
    {
        data.Projects.Add(project);
        data.SaveChanges(); // this fucking this is important ...
        return Ok(project);
    }

}