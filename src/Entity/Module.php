<?php

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints\Choice;

/**
 * @ORM\Entity(repositoryClass=ModuleRepository::class)
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=true
 *     },
 *     normalizationContext={"groups"={"module_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"name":"partial"})
 */
class Module
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"module_read", "questions_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"module_read", "questions_read", "users_read"})
     * @Assert\NotBlank(message="name is required")
     * @Assert\Length(
     *      min = 3,
     *      max = 10000,
     *      minMessage = "name must be at least 3 digits long",
     *      maxMessage = "name cannot be longer than 1000 digits"
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"module_read", "questions_read", "users_read"})
     * @Assert\NotBlank(message="description is required")
     * @Assert\Length(
     *      min = 3,
     *      max = 10000,
     *      minMessage = "description must be at least 3 characters long",
     *      maxMessage = "description cannot be longer than 1000 characters"
     * )
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Niveau::class, mappedBy="module")
     * @Groups({"module_read", "questions_read", "users_read"})
     */
    private $niveaux;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="modules")
     * @Groups({"module_read", "questions_read"})
     */
    private $teacher;

    /**
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="module")
     * @Groups({"questions_read"})
     */
    private $questions;

    /**
     * @ORM\OneToMany(targetEntity=Exam::class, mappedBy="module")
     */
    private $exams;

    public function __construct()
    {
        $this->niveaux = new ArrayCollection();
        $this->teacher = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->exams = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Niveau>
     */
    public function getNiveaux(): Collection
    {
        return $this->niveaux;
    }

    public function addNiveau(Niveau $niveau): self
    {
        if (!$this->niveaux->contains($niveau)) {
            $this->niveaux[] = $niveau;
            $niveau->setModule($this);
        }

        return $this;
    }

    public function removeNiveau(Niveau $niveau): self
    {
        if ($this->niveaux->removeElement($niveau)) {
            // set the owning side to null (unless already changed)
            if ($niveau->getModule() === $this) {
                $niveau->setModule(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getTeacher(): Collection
    {
        return $this->teacher;
    }

    public function addTeacher(User $teacher): self
    {
        if (!$this->teacher->contains($teacher)) {
            $this->teacher[] = $teacher;
        }

        return $this;
    }

    public function removeTeacher(User $teacher): self
    {
        $this->teacher->removeElement($teacher);

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setModule($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getModule() === $this) {
                $question->setModule(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Exam>
     */
    public function getExams(): Collection
    {
        return $this->exams;
    }

    public function addExam(Exam $exam): self
    {
        if (!$this->exams->contains($exam)) {
            $this->exams[] = $exam;
            $exam->setModule($this);
        }

        return $this;
    }

    public function removeExam(Exam $exam): self
    {
        if ($this->exams->removeElement($exam)) {
            // set the owning side to null (unless already changed)
            if ($exam->getModule() === $this) {
                $exam->setModule(null);
            }
        }

        return $this;
    }
}
