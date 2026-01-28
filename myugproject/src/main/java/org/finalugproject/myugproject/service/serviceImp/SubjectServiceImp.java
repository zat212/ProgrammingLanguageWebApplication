package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.model.Subject;
import org.finalugproject.myugproject.repository.SubjectRepository;
import org.finalugproject.myugproject.service.SubjectService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SubjectServiceImp implements SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectServiceImp(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Subject> findAllSubject() {
        return subjectRepository.findAll();
    }
}
