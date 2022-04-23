using System;
using AutoMapper;
using Server.Models.Database;
using Server.Models.Dto;

namespace Server.Profiles;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        this.CreateMap<Todo, TodoDto>()
            .ForMember(dto => dto.Id, o => o.MapFrom(todo => todo.Id.ToString()));

        this.CreateMap<TodoDto, Todo>()
            .ForMember(todo => todo.Id, o => o.MapFrom(dto => string.IsNullOrWhiteSpace(dto.Id) ? Guid.Empty : Guid.Parse(dto.Id)));
    }
}